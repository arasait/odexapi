module.exports = (app) => {
  const cuentas = require("../controllers/estadoCuenta.controller.js");

  // Retrieve all contratos
  app.get("/estadoCuenta", cuentas.findAll);

  // Retrieve a single Customer with customerId
  app.get("/estadoCuenta/:nrocontrato", cuentas.findOne);
};
