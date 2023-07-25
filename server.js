const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;
var cors = require("cors");

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación Odex APP API." });
});
require("./app/routes/consultorio.routes.js")(app);
require("./app/routes/doctor.routes.js")(app);
require("./app/routes/doctorConsultorio.routes.js")(app);
require("./app/routes/reservaciones.routes.js")(app);
require("./app/routes/agendamientos.routes.js")(app);
require("./app/routes/reservacionesDoctor.routes.js")(app);
require("./app/routes/horariosDoctor.routes.js")(app);
require("./app/routes/listaPacientes.routes.js")(app);
require("./app/routes/planes.routes.js")(app);
require("./app/routes/contratos.routes.js")(app);
require("./app/routes/confirmarReserva.routes.js")(app);
require("./app/routes/config.reservas.routes.js")(app);
require("./app/routes/horariosDoctorDias.routes.js")(app);
require("./app/routes/adherentes.routes.js")(app);
require("./app/routes/listaDentalCard.routes.js")(app);
require("./app/routes/especialidades.routes.js")(app);
require("./app/routes/facturas.routes.js")(app);
require("./app/routes/test.routes.js")(app);
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
