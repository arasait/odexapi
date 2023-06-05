const Planes = require("../models/planes.model.js");

// Create and Save a new reservacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Create a user
  const reservacion = new reservacion({
    name: req.body.nombre,
  });

  // Save user in the database
  Planes.create(reservacion, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear el usuario.",
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  Planes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los usuarios.",
      });
    else res.send(data);
  });
};

// Find a single user with a reservacionId
exports.findOne = (req, res) => {
  Planes.findById(req.params.asegurado_cedula, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No tiene ningun el agendamiento con el ci ${req.params.asegurado_cedula}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al recuperar el agendamiento con el ci " +
            req.params.asegurado_cedula,
        });
      }
    } else res.send(data);
  });
};

// Update a doctor identified by the doctorId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Planes.updateById(req.params.doctorId, new doctor(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra el usuario con el ci ${req.params.doctorId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al actualizar el usuario con el ci " + req.params.doctorId,
        });
      }
    } else res.send(data);
  });
};

// Delete a doctor with the specified doctorId in the request
exports.delete = (req, res) => {
  Planes.remove(req.params.doctorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra usuario con el ci ${req.params.doctorId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo borrar doctor con el codigo " + req.params.doctorId,
        });
      }
    } else res.send({ message: `usuario fue eliminado con éxito!` });
  });
};

// Delete all doctors from the database.
exports.deleteAll = (req, res) => {
  Planes.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los usuarios.",
      });
    else
      res.send({ message: `Todos los usuarios fueron eliminados con éxito!` });
  });
};
