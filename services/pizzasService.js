// services/pizzasService.js
import * as pizzasModel from "../models/pizzas.js";

/**
 * Obtiene la lista de todas las pizzas disponibles.
 * @returns {Promise<Array<object>>} Un arreglo con todas las pizzas.
 */
async function listarPizzas() {
  try {
    return await pizzasModel.listarPizzas();
  } catch (error) {
    console.error("Error al listar las pizzas en el servicio:", error);
    throw error;
  }
}

/**
 * Crea una nueva pizza en la base de datos.
 * @param {object} pizza - El objeto de la pizza a crear.
 * @returns {Promise<object>} El resultado de la operación de creación.
 */
async function crearPizza(pizza) {
  try {
    return await pizzasModel.crearPizza(pizza);
  } catch (error) {
    console.error("Error al crear la pizza en el servicio:", error);
    throw error;
  }
}
export { listarPizzas, crearPizza };