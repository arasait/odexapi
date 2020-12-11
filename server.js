const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var cors = require('cors')

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
// set port, listen for requests
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});