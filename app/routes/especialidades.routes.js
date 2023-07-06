module.exports = (app) => {
  const contratos = require("../controllers/especialidades.controller.js");

  // Retrieve all contratos
  app.get("/especialidades", contratos.findAll);

  // Retrieve a single Customer with customerId
  app.get("/especialidades/:nrocontrato", contratos.findOne);
};
