const Contratos = require("../models/adherentes.model.js");

// Retrieve all contratos from the database.
exports.findAll = (req, res) => {
  Contratos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar las contratos.",
      });
    else res.send(data);
  });
};

// Find a single doctor with a reservacionId
exports.findOne = (req, res) => {
  Contratos.findById(req.params.nrocontrato, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No tiene ningun el contrato con el nrocontrato ${req.params.nrocontrato}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al recuperar el contrato con el ci " +
            req.params.nrocontrato,
        });
      }
    } else res.send(data);
  });
};
