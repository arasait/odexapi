module.exports = app => {
  const reservaciones = require("../controllers/confirmarReserva.controller.js");

  // Create a new Customer
  app.post("/confirmarReserva", reservaciones.create);

  // Retrieve all reservaciones
  app.get("/confirmacionesReserva", reservaciones.findAll);

  // Retrieve a single Customer with customerId
  app.get("/confirmarReserva/:cedula", reservaciones.findOne);

  // Update a Customer with customerId
  app.put("/confirmarReserva/:nro_reserva", reservaciones.update);

  // Delete a Customer with customerId
  app.delete("/confirmarReserva/:nro_reserva", reservaciones.delete);

  // Create a new Customer
  //app.delete("/confirmarReserva", reservaciones.deleteAll);
};
