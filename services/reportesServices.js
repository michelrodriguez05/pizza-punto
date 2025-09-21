// services/reportesServices.js
import * as pedidosModel from "../models/pedidos.js";
import * as pizzasModel from "../models/pizzas.js";

/**
 * Genera un reporte de los ingredientes más usados en los pedidos.
 * @returns {Promise<Array<object>>} Un arreglo con los ingredientes y su conteo de uso.
 */
async function ingredientesMasUsados() {
  try {
    return await pedidosModel.ingredientesMasUsados();
  } catch (error) {
    console.error("Error al generar el reporte de ingredientes más usados:", error);
    throw error;
  }
}

/**
 * Genera un reporte con el precio promedio de las pizzas por categoría.
 * @returns {Promise<Array<object>>} Un arreglo con las categorías y su precio promedio.
 */
async function promedioPreciosPorCategoria() {
  try {
    return await pizzasModel.promedioPreciosPorCategoria();
  } catch (error) {
    console.error("Error al generar el reporte de promedio de precios:", error);
    throw error;
  }
}

/**
 * Genera un reporte de la categoría de pizza más vendida.
 * @returns {Promise<Array<object>>} Un arreglo con la categoría más vendida y la cantidad.
 */
async function categoriaMasVendida() {
  try {
    return await pedidosModel.categoriaMasVendida();
  } catch (error) {
    console.error("Error al generar el reporte de categoría más vendida:", error);
    throw error;
  }
}

export {
  ingredientesMasUsados,
  promedioPreciosPorCategoria,
  categoriaMasVendida,
};
