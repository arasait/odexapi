module.exports = (app) => {
  const facturas = require("../controllers/facturas.controller.js");

  // Retrieve all contratos
  app.get("/facturas", facturas.findAll);

  // Retrieve a single Customer with customerId
  app.get("/facturas/:nrocontrato", facturas.findOne);
};
