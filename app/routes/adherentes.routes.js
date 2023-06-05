module.exports = (app) => {
  const contratos = require("../controllers/adherentes.controller.js");

  // Retrieve all contratos
  app.get("/adherentes", contratos.findAll);

  // Retrieve a single Customer with customerId
  app.get("/adherentes/:nrocontrato", contratos.findOne);
};
