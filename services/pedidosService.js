// services/pedidosService.js
import * as pedidosModel from '../models/pedidos.js';

/**
 * Crea un nuevo pedido en la base de datos.
 * @param {object} pedido - El objeto del pedido a crear.
 * @returns {Promise<object>} El resultado de la operación de creación.
 */
async function crearPedido(pedido) {
  try {
    // Aquí podrías agregar lógica de negocio, como validar el pedido
    return await pedidosModel.crearPedido(pedido);
  } catch (error) {
    console.error('Error al crear el pedido en el servicio:', error);
    // Re-lanzar el error o manejarlo de una forma más específica
    throw error;
  }
}

/**
 * Obtiene la lista de todos los pedidos.
 * @returns {Promise<Array<object>>} Un arreglo con todos los pedidos.
 */
async function listarPedidos() {
  try {
    return await pedidosModel.listarPedidos();
  } catch (error) {
    console.error('Error al listar los pedidos en el servicio:', error);
    throw error;
  }
}

/**
 * Marca un pedido como completado.
 * @param {string|import('mongodb').ObjectId} id - El ID del pedido a completar.
 * @returns {Promise<object>} El resultado de la operación de actualización.
 */
async function completarPedido(id) {
  try {
    // La lógica de pasar "completado" es un buen ejemplo de lo que va en un servicio
    return await pedidosModel.actualizarEstado(id, 'completado');
  } catch (error) {
    console.error(`Error al completar el pedido ${id} en el servicio:`, error);
    throw error;
  }
}
export { crearPedido, listarPedidos, completarPedido };
