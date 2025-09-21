// models/pizzas.js
import { getDB } from "../config/db.js";

async function getCollection() {
  const db = getDB();
  return db.collection("pizzas");
}

export async function crearPizza(pizza) {
  const col = await getCollection();
  const result = await col.insertOne(pizza);
  return result.insertedId;
}

export async function listarPizzas() {
  const col = await getCollection();
  return await col.find().toArray();
}

export async function promedioPreciosPorCategoria() {
  const col = await getCollection();
  const pipeline = [
    {
      $group: {
        _id: "$categoria",
        precioPromedio: { $avg: "$precio" },
      },
    },
    {
      $project: {
        _id: 0,
        categoria: "$_id",
        precioPromedio: { $round: ["$precioPromedio", 2] },
      },
    },
    { $sort: { categoria: 1 } },
  ];
  return await col.aggregate(pipeline).toArray();
}