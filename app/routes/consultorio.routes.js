module.exports = app => {
    const consultorio = require("../controllers/consultorio.controller.js");
  
    // Create a new Customer
    app.post("/consultorio", consultorio.create);
  
    // Retrieve all consultorio
    app.get("/consultorio", consultorio.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/consultorio/:consultorioId", consultorio.findOne);
  
    // Update a Customer with customerId
    app.put("/consultorio/:consultorioId", consultorio.update);
  
    // Delete a Customer with customerId
    app.delete("/consultorio/:consultorioId", consultorio.delete);
  
    // Create a new Customer
    app.delete("/consultorio", consultorio.deleteAll);
  };