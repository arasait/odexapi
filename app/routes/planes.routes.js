module.exports = app => {
  const planes = require("../controllers/planes.controller.js");

  // Create a new Customer
  app.post("/planes", planes.create);

  // Retrieve all planes
  app.get("/planes", planes.findAll);

  // Retrieve a single Customer with customerId
  app.get("/planes/:asegurado_cedula", planes.findOne);

  // Update a Customer with customerId
  app.put("/planes/:consultorioCode", planes.update);

  // Delete a Customer with customerId
  app.delete("/planes/:consultorioCode", planes.delete);

  // Create a new Customer
  app.delete("/planes", planes.deleteAll);
};
