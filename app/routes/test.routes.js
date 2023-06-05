module.exports = (app) => {
  const contratos = require("../controllers/test.controller.js");

  // Create a new Customer
  app.post("/test", contratos.create);

  // Retrieve all contratos
  app.get("/test", contratos.findAll);

  // Retrieve a single Customer with customerId
  app.get("/test/:nrocedula", contratos.findOne);

  // Update a Customer with customerId
  app.put("/test/:consultorioCode", contratos.update);

  // Delete a Customer with customerId
  app.delete("/test/:consultorioCode", contratos.delete);

  // Create a new Customer
  app.delete("/test", contratos.deleteAll);
};
