const { agregarIngrediente, listarIngredientes } = require("../models/ingredientes");

async function agregarStock(ingrediente) {
  return await agregarIngrediente(ingrediente);
}

async function mostrarStock() {
  return await listarIngredientes();
}

module.exports = { agregarStock, mostrarStock };
