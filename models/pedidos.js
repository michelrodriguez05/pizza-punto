import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

async function getCollection() {
  const db = getDB();
  return db.collection("pedidos");
}

export async function crearPedido(pedido) {
  const col = await getCollection();
  const result = await col.insertOne(pedido);
  return result.insertedId;
}

export async function listarPedidos() {
  const col = await getCollection();
  return await col.find().toArray();
}

export async function actualizarEstado(id, estado) {
  const col = await getCollection();
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { estado } });
}

export async function ingredientesMasUsados() {
  const col = await getCollection();

  const fechaInicio = new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 1);

  const pipeline = [
    { $match: { fecha: { $gte: fechaInicio } } },
    { $unwind: "$pizzas" },
    {
      $lookup: {
        from: "pizzas",
        localField: "pizzas.pizzaId",
        foreignField: "_id",
        as: "pizza"
      }
    },
    { $unwind: "$pizza" },
    { $unwind: "$pizza.ingredientes" },
    {
      $project: {
        ingredienteId: "$pizza.ingredientes.ingredienteId",
        cantidadUsada: { $multiply: ["$pizza.ingredientes.cantidad", "$pizzas.cantidad"] }
      }
    },
    {
      $group: {
        _id: "$ingredienteId",
        totalUsos: { $sum: "$cantidadUsada" }
      }
    },
    {
      $lookup: {
        from: "ingredientes",
        localField: "_id",
        foreignField: "_id",
        as: "ingrediente"
      }
    },
    { $unwind: "$ingrediente" },
    {
      $project: {
        _id: 0,
        ingredienteId: "$_id",
        nombre: "$ingrediente.nombre",
        tipo: "$ingrediente.tipo",
        totalUsos: 1
      }
    },
    { $sort: { totalUsos: -1 } },
    { $limit: 10 }
  ];

  return await col.aggregate(pipeline).toArray();
}

export async function categoriaMasVendida() {
  const col = await getCollection();

  const pipeline = [
    { $unwind: "$pizzas" },
    {
      $group: {
        _id: "$pizzas.pizzaId",
        ventasPizza: { $sum: "$pizzas.cantidad" }
      }
    },
    {
      $lookup: {
        from: "pizzas",
        localField: "_id",
        foreignField: "_id",
        as: "pizza"
      }
    },
    { $unwind: "$pizza" },
    {
      $group: {
        _id: "$pizza.categoria",
        ventasCategoria: { $sum: "$ventasPizza" }
      }
    },
    {
      $project: {
        _id: 0,
        categoria: "$_id",
        ventasCategoria: 1
      }
    },
    { $sort: { ventasCategoria: -1 } }
  ];

  return await col.aggregate(pipeline).toArray();
}
