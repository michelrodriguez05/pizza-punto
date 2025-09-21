const inquirer = require("inquirer");
const menu = require("./utils/menu");
const connectDB = require("./config/db");

(async () => {
  const db = await connectDB();
  await menu(db); // llamamos al menú principal
})();

import inquirer from "inquirer";
import { conectar } from "./config/db.js";

async function main() {
  const db = await conectar();
  console.log("Base de datos lista:", db.databaseName);

  // Aquí luego llamamos al menú
}

main();
