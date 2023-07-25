const Cuentas = require("../models/estadoCuenta.model.js");

// Retrieve all contratos from the database.
exports.findAll = (req, res) => {
    Cuentas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar las cuentas.",
      });
    else res.send(data);
  });
};

// Find a single doctor with a reservacionId
exports.findOne = (req, res) => {
    Cuentas.findById(req.params.nrocontrato, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No tiene ninguna cuenta con el nrocontrato ${req.params.nrocontrato}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al recuperar la cuenta del nrocontrato " +
            req.params.nrocontrato,
        });
      }
    } else res.send(data);
  });
};
