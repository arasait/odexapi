module.exports = app => {
    const reservaciones = require("../controllers/reservacionesDoctor.controller.js");
  
    // Create a new Customer
    app.post("/reservacionesDoctor", reservaciones.create);
  
    // Retrieve all reservaciones
    app.get("/reservacionesDoctor", reservaciones.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/reservacionesDoctor/:nro_reserva", reservaciones.findOne);
  
    // Update a Customer with customerId
    app.put("/reservacionesDoctor/:nro_reserva", reservaciones.update);
  
    // Delete a Customer with customerId
    app.delete("/reservacionesDoctor/:nro_reserva", reservaciones.delete);
  
    // Create a new Customer
    app.delete("/reservacionesDoctor", reservaciones.deleteAll);
  };