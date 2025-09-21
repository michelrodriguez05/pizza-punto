// services/inventarioService.js
import * as inventarioModel from "../models/ingredientes.js";

/**
 * Agrega un nuevo ingrediente al inventario.
 * @param {object} ingrediente - El objeto del ingrediente a agregar.
 * @returns {Promise<object>} El resultado de la operación de inserción.
 */
async function agregarIngrediente(ingrediente) {
  try {
    // Aquí podrías validar que el ingrediente no exista ya, etc.
    return await inventarioModel.agregarIngrediente(ingrediente);
  } catch (error) {
    console.error("Error al agregar el ingrediente en el servicio:", error);
    throw error;
  }
}

/**
 * Obtiene la lista de todos los ingredientes en el inventario.
 * @returns {Promise<Array<object>>} Un arreglo con todos los ingredientes.
 */
async function listarIngredientes() {
  try {
    return await inventarioModel.listarIngredientes();
  } catch (error) {
    console.error("Error al listar los ingredientes en el servicio:", error);
    throw error;
  }
}
export { agregarIngrediente, listarIngredientes };
