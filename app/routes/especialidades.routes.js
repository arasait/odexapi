module.exports = app => {
  const especialidades = require("../controllers/especialidades.controller.js");

  // Create a new Customer
  app.post("/especialidades", especialidades.create);

  // Retrieve all planes
  app.get("/especialidades", especialidades.findAll);

  // Retrieve a single Customer with customerId
  app.get("/especialidades/:especialidad", especialidades.findOne);

  // Update a Customer with customerId
  app.put("/especialidades/:especialidad", especialidades.update);

  // Delete a Customer with customerId
  app.delete("/especialidades/:especialidad", especialidades.delete);

  // Create a new Customer
  app.delete("/especialidades", especialidades.deleteAll);
};
