import { getDB } from "../config/db.js";

async function getCollection() {
  const db = getDB();
  return db.collection("repartidores");
}

export async function registrarRepartidor(repartidor) {
  const col = await getCollection();
  const result = await col.insertOne(repartidor);
  return result.insertedId;
}

export async function listarRepartidores() {
  const col = await getCollection();
  return await col.find().toArray();
}
