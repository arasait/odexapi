module.exports = (app) => {
  const reservaciones = require("../controllers/horariosDoctorDias.controller.js");

  // Create a new Customer
  app.post("/horariosDoctorDias", reservaciones.create);

  // Retrieve all reservaciones
  app.get("/horariosDoctorDias", reservaciones.findAll);

  // Retrieve a single Customer with customerId
  app.get("/horariosDoctorDias/:doctor", reservaciones.findOne);

  // Update a Customer with customerId
  app.put("/horariosDoctorDias/:consultorioCode", reservaciones.update);

  // Delete a Customer with customerId
  app.delete("/horariosDoctorDias/:consultorioCode", reservaciones.delete);

  // Create a new Customer
  app.delete("/horariosDoctorDias", reservaciones.deleteAll);
};
