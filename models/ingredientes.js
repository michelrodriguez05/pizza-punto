// models/ingredientes.js
import { getDB } from "../config/db.js";

async function getCollection() {
  const db = getDB();
  return db.collection("ingredientes");
}

export async function agregarIngrediente(ingrediente) {
  const col = await getCollection();
  const result = await col.insertOne(ingrediente);
  return result.insertedId;
}

export async function listarIngredientes() {
  const col = await getCollection();
  return await col.find().toArray();
}