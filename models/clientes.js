const connectDB = require("../config/db");

async function getCollection() {
  const db = await connectDB();
  return db.collection("clientes");
}

async function crearCliente(cliente) {
  const col = await getCollection();
  const result = await col.insertOne(cliente);
  return result.insertedId;
}

async function listarClientes() {
  const col = await getCollection();
  return await col.find().toArray();
}

module.exports = { crearCliente, listarClientes };
