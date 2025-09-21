const connectDB = require("../config/db");

async function getCollection() {
  const db = await connectDB();
  return db.collection("ingredientes");
}

async function agregarIngrediente(ingrediente) {
  const col = await getCollection();
  const result = await col.insertOne(ingrediente);
  return result.insertedId;
}

async function listarIngredientes() {
  const col = await getCollection();
  return await col.find().toArray();
}

module.exports = { agregarIngrediente, listarIngredientes };
