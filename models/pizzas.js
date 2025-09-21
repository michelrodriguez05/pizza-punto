const connectDB = require("../config/db");

async function getCollection() {
  const db = await connectDB();
  return db.collection("pizzas");
}

async function crearPizza(pizza) {
  const col = await getCollection();
  const result = await col.insertOne(pizza);
  return result.insertedId;
}

async function listarPizzas() {
  const col = await getCollection();
  return await col.find().toArray();
}

module.exports = { crearPizza, listarPizzas };
