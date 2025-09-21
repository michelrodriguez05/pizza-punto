const { crearPedido, listarPedidos, actualizarEstado } = require("../models/pedidos");

async function nuevoPedido(cliente, items) {
  return await crearPedido({ cliente, items, fecha: new Date(), estado: "pendiente" });
}

async function obtenerPedidos() {
  return await listarPedidos();
}

async function completarPedido(id) {
  return await actualizarEstado(id, "completado");
}

module.exports = { nuevoPedido, obtenerPedidos, completarPedido };
