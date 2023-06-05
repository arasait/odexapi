const Config = require("../models/config.model.js");

// Retrieve all contratos from the database.
exports.findAll = (req, res) => {
  Config.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar las contratos."
      });
    else res.send(data);
  });
};
