module.exports = app => {
    const doctor = require("../controllers/doctor.controller.js");
  
    // Create a new Customer
    app.post("/doctor", doctor.create);
  
    // Retrieve all doctor
    app.get("/doctor", doctor.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/doctor/:doctorId", doctor.findOne);
  
    // Update a Customer with customerId
    app.put("/doctor/:doctorId", doctor.update);
  
    // Delete a Customer with customerId
    app.delete("/doctor/:doctorId", doctor.delete);
  
    // Create a new Customer
    app.delete("/doctor", doctor.deleteAll);
  };