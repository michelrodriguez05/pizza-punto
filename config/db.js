import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"; // O tu cadena de conexión de Atlas
const client = new MongoClient(uri);
const dbName = "pizza_punto";

async function conectar() {
  try {
    await client.connect();
    console.log("✅ Conexión con MongoDB exitosa!");
    return client.db(dbName);
  } catch (error) {
    console.log("❌ Error al conectar MongoDB! ", error);
    process.exit(1);
  }
}

// Para usar la conexión, el punto de entrada (index.js) llamará a esta función
export async function getDb() {
  const db = await conectar();
  return db;
}

// Puedes exportar el cliente si necesitas cerrar la conexión
export async function getClient() {
  await conectar();
  return client;
}

// Nota: En la imagen, el código es un poco diferente, pero este enfoque es más seguro
// ya que reutiliza la conexión en lugar de crear una nueva cada vez.