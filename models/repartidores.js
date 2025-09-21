const connectDB = require("../config/db");

async function getCollection() {
  const db = await connectDB();
  return db.collection("repartidores");
}

async function registrarRepartidor(repartidor) {
  const col = await getCollection();
  const result = await col.insertOne(repartidor);
  return result.insertedId;
}

async function listarRepartidores() {
  const col = await getCollection();
  return await col.find().toArray();
}

module.exports = { registrarRepartidor, listarRepartidores };
