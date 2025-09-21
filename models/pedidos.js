const connectDB = require("../config/db");

async function getCollection() {
  const db = await connectDB();
  return db.collection("pedidos");
}

async function crearPedido(pedido) {
  const col = await getCollection();
  const result = await col.insertOne(pedido);
  return result.insertedId;
}

async function listarPedidos() {
  const col = await getCollection();
  return await col.find().toArray();
}

async function actualizarEstado(id, estado) {
  const col = await getCollection();
  const { ObjectId } = require("mongodb");
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { estado } });
}

module.exports = { crearPedido, listarPedidos, actualizarEstado };
