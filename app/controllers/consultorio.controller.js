const Consultorio = require("../models/consultorio.model.js");

// Create and Save a new consultorio
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Create a consultorio
  const consultorio = new consultorio({
    name: req.body.nombre,
  });

  // Save consultorio in the database
  Consultorio.create(consultorio, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear el consultorio.",
      });
    else res.send(data);
  });
};

// Retrieve all consultorios from the database.
exports.findAll = (req, res) => {
  Consultorio.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar consultorios.",
      });
    else res.send(data);
  });
};

// Find a single consultorio with a consultorioId
exports.findOne = (req, res) => {
  Consultorio.findById(req.params.consultorioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra consultorio con el codigo ${req.params.consultorioId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al recuperar consultorio con el codigo " +
            req.params.consultorioId,
        });
      }
    } else res.send(data);
  });
};

// Update a consultorio identified by the consultorioId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Consultorio.updateById(
    req.params.consultorioId,
    new consultorio(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra consultorio con el codigo ${req.params.consultorioId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error al actualizar consultorio con el codigo " +
              req.params.consultorioId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a consultorio with the specified consultorioId in the request
exports.delete = (req, res) => {
  Consultorio.remove(req.params.consultorioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra consultorio con el codigo ${req.params.consultorioId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo borrar consultorio con el codigo " +
            req.params.consultorioId,
        });
      }
    } else res.send({ message: `consultorio fue eliminado con éxito!` });
  });
};

// Delete all consultorios from the database.
exports.deleteAll = (req, res) => {
  Consultorio.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Se produjo un error al eliminar todos los consultorios.",
      });
    else
      res.send({
        message: `Todos los consultorios fueron eliminados con éxito!`,
      });
  });
};
