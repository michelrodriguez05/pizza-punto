const { listarPedidos } = require("../models/pedidos");

async function generarReporteVentas() {
  const pedidos = await listarPedidos();
  return pedidos.map(p => ({
    cliente: p.cliente,
    estado: p.estado,
    fecha: p.fecha,
    cantidad: p.items.length
  }));
}

module.exports = { generarReporteVentas };
