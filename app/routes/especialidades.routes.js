module.exports = (app) => {
  const especialidad = require("../controllers/especialidades.controller.js");

  // Retrieve all contratos
  app.get("/especialidades", especialidad.findAll);

  // Retrieve a single Customer with customerId
  app.get("/especialidades/:nrocontrato", especialidad.findOne);
};
