const inquirer = require("inquirer");
const { crearPedido, listarPedidos } = require("./services/pedidosService");
const { agregarIngrediente, listarIngredientes } = require("./services/inventarioService");
const { ingredientesMasUsados, promedioPreciosPorCategoria, categoriaMasVendida } = require("./services/reportesService");

async function menu() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "🍕 Bienvenido a Pizza y Punto - Selecciona una opción:",
        choices: [
          "Registrar Pedido",
          "Gestionar Inventario",
          "Reportes de Ventas",
          "Ver Pedidos",
          "Salir",
        ],
      },
    ]);

    switch (opcion) {
      case "Registrar Pedido":
        const pedido = {
          cliente: "Michel", // luego lo puedes pedir por inquirer
          pizzas: ["Hawaiana", "Pepperoni"], // también se pueden pedir dinámicamente
        };
        const id = await crearPedido(pedido);
        console.log(`📦 Pedido creado con ID: ${id}`);
        break;

      case "Gestionar Inventario":
        const { accionInv } = await inquirer.prompt([
          {
            type: "list",
            name: "accionInv",
            message: "⚙️ Opciones de Inventario:",
            choices: ["Agregar Ingrediente", "Ver Ingredientes", "Volver"],
          },
        ]);

        if (accionInv === "Agregar Ingrediente") {
          const { nombre, tipo, stock } = await inquirer.prompt([
            { type: "input", name: "nombre", message: "Nombre del ingrediente:" },
            { type: "input", name: "tipo", message: "Tipo (queso, salsa, topping...):" },
            { type: "number", name: "stock", message: "Cantidad en stock:" },
          ]);
          await agregarIngrediente({ nombre, tipo, stock });
          console.log("✅ Ingrediente agregado con éxito!");
        } else if (accionInv === "Ver Ingredientes") {
          console.table(await listarIngredientes());
        }
        break;

      case "Reportes de Ventas":
        const { reporte } = await inquirer.prompt([
          {
            type: "list",
            name: "reporte",
            message: "📊 Selecciona un reporte:",
            choices: [
              "Ingredientes más usados",
              "Promedio de precios por categoría",
              "Categoría más vendida",
              "Volver",
            ],
          },
        ]);

        if (reporte === "Ingredientes más usados") {
          console.table(await ingredientesMasUsados());
        } else if (reporte === "Promedio de precios por categoría") {
          console.table(await promedioPreciosPorCategoria());
        } else if (reporte === "Categoría más vendida") {
          console.table(await categoriaMasVendida());
        }
        break;

      case "Ver Pedidos":
        console.table(await listarPedidos());
        break;

      case "Salir":
        salir = true;
        console.log("👋 Gracias por usar Pizza y Punto");
        break;
    }
  }
}

module.exports = menu;
