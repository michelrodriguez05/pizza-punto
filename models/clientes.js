import { getDB } from "../config/db.js";

async function getCollection() {
  const db = getDB();
  return db.collection("clientes");
}

export async function crearCliente(cliente) {
  const col = await getCollection();
  const result = await col.insertOne(cliente);
  return result.insertedId;
}

export async function listarClientes() {
  const col = await getCollection();
  return await col.find().toArray();
}
