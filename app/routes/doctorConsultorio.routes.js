module.exports = app => {
    const doctorConsultorio = require("../controllers/doctorConsultorio.controller.js");
  
    // Create a new Customer
    app.post("/doctorConsultorio", doctorConsultorio.create);
  
    // Retrieve all doctorConsultorio
    app.get("/doctorConsultorio", doctorConsultorio.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/doctorConsultorio/:consultorioCode", doctorConsultorio.findOne);
  
    // Update a Customer with customerId
    app.put("/doctorConsultorio/:consultorioCode", doctorConsultorio.update);
  
    // Delete a Customer with customerId
    app.delete("/doctorConsultorio/:consultorioCode", doctorConsultorio.delete);
  
    // Create a new Customer
    app.delete("/doctorConsultorio", doctorConsultorio.deleteAll);
  };