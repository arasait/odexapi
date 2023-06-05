module.exports = app => {
    const agendamientos = require("../controllers/agendamientos.controller.js");
  
    // Create a new Customer
    app.post("/agendamientos", agendamientos.create);
  
    // Retrieve all agendamientos
    app.get("/agendamientos", agendamientos.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/agendamientos/:asegurado_cedula", agendamientos.findOne);
  
    // Update a Customer with customerId
    app.put("/agendamientos/:consultorioCode", agendamientos.update);
  
    // Delete a Customer with customerId
    app.delete("/agendamientos/:consultorioCode", agendamientos.delete);
  
    // Create a new Customer
    app.delete("/agendamientos", agendamientos.deleteAll);
  };