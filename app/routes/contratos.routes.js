module.exports = (app) => {
  const contratos = require("../controllers/contratos.controller.js");

  // Create a new Customer
  app.post("/contratos", contratos.create);

  // Retrieve all contratos
  app.get("/contratos", contratos.findAll);

  // Retrieve a single Customer with customerId
  app.get("/contratos/:nrocedula", contratos.findOne);

  // Update a Customer with customerId
  app.put("/contratos/:consultorioCode", contratos.update);

  // Delete a Customer with customerId
  app.delete("/contratos/:consultorioCode", contratos.delete);

  // Create a new Customer
  app.delete("/contratos", contratos.deleteAll);
};
