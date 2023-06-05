module.exports = app => {
    const reservaciones = require("../controllers/horariosDoctor.controller.js");
  
    // Create a new Customer
    app.post("/horariosDoctor", reservaciones.create);
  
    // Retrieve all reservaciones
    app.get("/horariosDoctor", reservaciones.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/horariosDoctor/:doctor", reservaciones.findOne);
  
    // Update a Customer with customerId
    app.put("/horariosDoctor/:consultorioCode", reservaciones.update);
  
    // Delete a Customer with customerId
    app.delete("/horariosDoctor/:consultorioCode", reservaciones.delete);
  
    // Create a new Customer
    app.delete("/horariosDoctor", reservaciones.deleteAll);
  };