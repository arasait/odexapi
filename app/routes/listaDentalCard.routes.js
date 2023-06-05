module.exports = (app) => {
  const reservaciones = require("../controllers/listaDentalCard.controller.js");

  // Create a new Customer
  app.post("/listaDentalCard", reservaciones.create);

  // Retrieve all reservaciones
  app.get("/listaDentalCard", reservaciones.findAll);

  // Retrieve a single Customer with customerId
  app.get("/listaDentalCard/:cedula", reservaciones.findOne);

  // Update a Customer with customerId
  app.put("/listaDentalCard/:asegurado_cedula", reservaciones.update);

  // Delete a Customer with customerId
  app.delete("/listaDentalCard/:asegurado_cedula", reservaciones.delete);

  // Create a new Customer
  app.delete("/listaDentalCard", reservaciones.deleteAll);
};
