// config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "pizza_punto";
const cliente = new MongoClient(uri);

let _db = null;

export async function conectar() {
  if (_db) return _db;
  try {
    await cliente.connect();
    _db = cliente.db(dbName);
    console.log(`✅ Conectado a MongoDB (${dbName})`);
    return _db;
  } catch (error) {
    console.error("Error al conectar MongoDB! ", error);
    throw error; // Re-lanzamos para que la aplicación principal se detenga
  }
}

export function getDB() {
  if (!_db) throw new Error("❌ No hay conexión a la base de datos");
  return _db;
}

export async function cerrarConexion() {
  await cliente.close();
  _db = null;
  console.log("🔌 Conexión cerrada");
}
