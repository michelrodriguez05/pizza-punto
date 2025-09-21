// utils/menu.js
import inquirer from "inquirer";
import { cerrarConexion } from "../config/db.js";
import { crearPedido, listarPedidos } from "../services/pedidosService.js";
import { agregarIngrediente, listarIngredientes } from "../services/inventarioService.js";
import { listarPizzas, crearPizza } from "../services/pizzasService.js";
import {
  ingredientesMasUsados,
  promedioPreciosPorCategoria,
  categoriaMasVendida
} from "../services/reportesServices.js";

async function handleRegistrarPedido() {
  // 1. Obtener pizzas disponibles desde el servicio
  const pizzasDisponibles = await listarPizzas();
  if (pizzasDisponibles.length === 0) {
    console.log("❌ No hay pizzas en el menú para registrar un pedido. Agrega algunas primero.");
    return;
  }

  // 2. Preparar las opciones para inquirer
  const choicesPizzas = pizzasDisponibles.map(p => ({
    name: `${p.nombre} - $${p.precio}`,
    value: p._id // El valor será el ID de la pizza
  }));

  // 3. Preguntar al usuario por el cliente y las pizzas que quiere
  const { cliente } = await inquirer.prompt([{ type: "input", name: "cliente", message: "Nombre del cliente:" }]);
  const { pizzasSeleccionadas } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "pizzasSeleccionadas",
      message: "Selecciona las pizzas del pedido:",
      choices: choicesPizzas,
      validate: (answer) => answer.length > 0 || "Debes elegir al menos una pizza.",
    },
  ]);

  // 4. Para cada pizza seleccionada, preguntar la cantidad
  const itemsPedido = [];
  for (const pizzaId of pizzasSeleccionadas) {
    const pizzaInfo = pizzasDisponibles.find(p => p._id.equals(pizzaId));
    const { cantidad } = await inquirer.prompt([
      {
        type: "number",
        name: "cantidad",
        message: `¿Cuántas pizzas de "${pizzaInfo.nombre}"?`,
        default: 1,
        validate: (value) => value > 0 || "La cantidad debe ser mayor a 0.",
      },
    ]);
    itemsPedido.push({ pizzaId, cantidad });
  }

  // 5. Construir y crear el pedido con el formato correcto
  const pedido = { cliente, pizzas: itemsPedido, fecha: new Date(), estado: "pendiente" };

  const id = await crearPedido(pedido);
  console.log(`📦 Pedido creado con éxito. ID: ${id}`);
}

async function handleCrearPizza() {
  console.log("🍕 Creando una nueva pizza...");

  // Primero, obtener los ingredientes disponibles para elegir
  const ingredientesDisponibles = await listarIngredientes();
  if (ingredientesDisponibles.length === 0) {
    console.log("⚠️ No hay ingredientes en el inventario. Agrega algunos desde 'Gestionar Inventario' antes de crear una pizza.");
    return;
  }

  const choicesIngredientes = ingredientesDisponibles.map(ing => ({
    name: `${ing.nombre} (${ing.tipo})`,
    value: ing._id
  }));

  const pizzaData = await inquirer.prompt([
    { type: "input", name: "nombre", message: "Nombre de la pizza:", validate: input => input.length > 0 || "El nombre no puede estar vacío." },
    { type: "number", name: "precio", message: "Precio:", default: 10, validate: value => value > 0 || "El precio debe ser mayor a 0." },
    { type: "input", name: "categoria", message: "Categoría (ej. Clásica, Gourmet):", default: "Clásica" },
    {
      type: "checkbox",
      name: "ingredientes",
      message: "Selecciona los ingredientes:",
      choices: choicesIngredientes,
      validate: (answer) => answer.length > 0 || "Debes elegir al menos un ingrediente.",
    }
  ]);

  // El modelo de datos espera que los ingredientes de una pizza sean un array de objetos
  // con el ID del ingrediente y la cantidad. Por simplicidad, usaremos una cantidad de 1.
  const ingredientesParaPizza = pizzaData.ingredientes.map(ingredienteId => ({
    ingredienteId: ingredienteId,
    cantidad: 1
  }));

  const nuevaPizza = {
    nombre: pizzaData.nombre,
    precio: pizzaData.precio,
    categoria: pizzaData.categoria,
    ingredientes: ingredientesParaPizza
  };

  await crearPizza(nuevaPizza);
  console.log(`✅ Pizza "${nuevaPizza.nombre}" creada con éxito!`);
}

async function handleGestionarInventario() {
  const { accionInv } = await inquirer.prompt([
    {
      type: "list",
      name: "accionInv",
      message: "⚙️ Opciones de Inventario:",
      choices: ["Agregar Ingrediente", "Ver Ingredientes", "Volver"],
    },
  ]);

  switch (accionInv) {
    case "Agregar Ingrediente": {
      const { nombre, tipo, stock } = await inquirer.prompt([
        { type: "input", name: "nombre", message: "Nombre del ingrediente:" },
        { type: "input", name: "tipo", message: "Tipo (queso, salsa, topping...):" },
        { type: "number", name: "stock", message: "Cantidad en stock:", default: 0 },
      ]);
      await agregarIngrediente({ nombre, tipo, stock });
      console.log("✅ Ingrediente agregado con éxito!");
      break;
    }
    case "Ver Ingredientes": {
      const ingredientes = await listarIngredientes();
      if (ingredientes.length > 0) {
        console.table(ingredientes);
      } else {
        console.log("No hay ingredientes en el inventario.");
      }
      break;
    }
    case "Volver":
      break;
  }
}

async function handleReportes() {
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

  switch (reporte) {
    case "Ingredientes más usados":
      console.table(await ingredientesMasUsados());
      break;
    case "Promedio de precios por categoría":
      console.table(await promedioPreciosPorCategoria());
      break;
    case "Categoría más vendida":
      console.table(await categoriaMasVendida());
      break;
    case "Volver":
      break;
  }
}


export default async function menu() {
  let salir = false;

  while (!salir) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "🍕 Bienvenido a Pizza y Punto - Selecciona una opción:",
        choices: [
          "Registrar Pedido",
          "Crear Pizza",
          "Gestionar Inventario",
          "Reportes de Ventas",
          "Ver Pedidos",
          "Salir",
        ],
      },
    ]);

    try {
      switch (opcion) {
        case "Registrar Pedido":
          await handleRegistrarPedido();
          break;

        case "Crear Pizza":
          await handleCrearPizza();
          break;

        case "Gestionar Inventario":
          await handleGestionarInventario();
          break;

        case "Reportes de Ventas":
          await handleReportes();
          break;

        case "Ver Pedidos":
          console.table(await listarPedidos());
          break;

        case "Salir":
          salir = true;
          await cerrarConexion();
          console.log("👋 Gracias por usar Pizza y Punto");
          break;
      }
    } catch (error) {
      console.error("❌ Ocurrió un error:", error.message);
    }
  }
}
