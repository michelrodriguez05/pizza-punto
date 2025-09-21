// index.js
import { conectar } from "./config/db.js";
import menu from "./utils/menu.js";

async function main() {
  try {
    await conectar(); // se conecta a MongoDB
    await menu(); // Inicia el menú principal de la aplicación
  } catch (error) {
    console.error("❌ Error fatal en la aplicación:", error);
    process.exit(1); // Salir con un código de error
  }
}

main();
