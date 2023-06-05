module.exports = app => {
    const reservaciones = require("../controllers/reservaciones.controller.js");
  
    // Create a new Customer
    app.post("/reservaciones", reservaciones.create);
  
    // Retrieve all reservaciones
    app.get("/reservaciones", reservaciones.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/reservaciones/:asegurado_cedula", reservaciones.findOne);
  
    // Update a Customer with customerId
    app.put("/reservaciones/:consultorioCode", reservaciones.update);
  
    // Delete a Customer with customerId
    app.delete("/reservaciones/:consultorioCode", reservaciones.delete);
  
    // Create a new Customer
    app.delete("/reservaciones", reservaciones.deleteAll);
  };