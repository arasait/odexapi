module.exports = (app) => {
  const usuarios = require("../controllers/usuarios.controller.js");

  // Create a new Customer
  app.post("/usuarios", usuarios.create);

  // Retrieve all usuarios
  app.get("/usuarios", usuarios.findAll);

  // Retrieve a single Customer with customerId
  app.get("/usuarios/:asegurado_cedula", usuarios.findOne);

  // Update a Customer with customerId
  app.put("/usuarios/:consultorioCode", usuarios.update);

  // Delete a Customer with customerId
  app.delete("/usuarios/:consultorioCode", usuarios.delete);

  // Create a new Customer
  app.delete("/usuarios", usuarios.deleteAll);
};
