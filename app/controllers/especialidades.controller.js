const Consultorio = require("../models/especialidades.model.js");

// Create and Save a new especialidad
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Create a especialidad
  const especialidad = new especialidad({
    name: req.body.nombre,
  });

  // Save consultorio in the database
  Especialidad.create(especialidad, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear especialidad.",
      });
    else res.send(data);
  });
};

// Retrieve all consultorios from the database.
exports.findAll = (req, res) => {
  Especialidad.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar especialidades.",
      });
    else res.send(data);
  });
};

// Find a single consultorio with a consultorioId
exports.findOne = (req, res) => {
  Especialidad.findById(req.params.especialidadId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra especialidad con el codigo ${req.params.especialidadId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al recuperar consultorio con el codigo " +
            req.params.especialidadId,
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

  Especialidad.updateById(
    req.params.especialidadId,
    new consultorio(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra consultorio con el codigo ${req.params.especialidadId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error al actualizar consultorio con el codigo " +
              req.params.especialidadId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a consultorio with the specified consultorioId in the request
exports.delete = (req, res) => {
  Especialidad.remove(req.params.especialidadId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra especialidad con el codigo ${req.params.especialidadId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo borrar especialidad con el codigo " +
            req.params.especialidadId,
        });
      }
    } else res.send({ message: `especialidad fue eliminada con éxito!` });
  });
};

// Delete all consultorios from the database.
exports.deleteAll = (req, res) => {
  Especialidad.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Se produjo un error al eliminar todos los especialidades.",
      });
    else
      res.send({
        message: `Todos las especialidades fueron eliminadas con éxito!`,
      });
  });
};
