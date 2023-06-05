module.exports = app => {
    const reservaciones = require("../controllers/listaPacientes.controller.js");
  
    // Create a new Customer
    app.post("/listaPaciente", reservaciones.create);
  
    // Retrieve all reservaciones
    app.get("/listaPacientes", reservaciones.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/listaPaciente/:cedula", reservaciones.findOne);
  
    // Update a Customer with customerId
    app.put("/listaPaciente/:asegurado_cedula", reservaciones.update);
  
    // Delete a Customer with customerId
    app.delete("/listaPaciente/:asegurado_cedula", reservaciones.delete);
  
    // Create a new Customer
    app.delete("/listaPaciente", reservaciones.deleteAll);
  };