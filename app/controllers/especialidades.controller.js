const Especialidades = require("../models/especialidades.model.js");

// Create and Save a new reservacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
  }

  // Create a agendamientos
  const reservacion = new reservacion({
    name: req.body.nombre
  });

  // Save agendamientos in the database
  Especialidades.create(especialidad, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear la especialidad."
      });
    else res.send(data);
  });
};

// Retrieve all agendamientos from the database.
exports.findAll = (req, res) => {
  Especialidades.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al recuperar las especialidades."
      });
    else res.send(data);
  });
};

// Find a single especialidad with a especialidadId
exports.findOne = (req, res) => {
  Especialidades.findById(req.params.especialidad, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay especialidad con ID ${req.params.especialidad}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error al recuperar el agendamiento con el ci " +
            req.params.especialidad
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
      message: "Content can not be empty!"
    });
  }

  Especialidades.updateById(req.params.especialidad, new doctor(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra la especialidad con el codigo ${req.params.especialidad}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error al actualizar la especialidad con el codigo " + req.params.especialidad
        });
      }
    } else res.send(data);
  });
};

// Delete a doctor with the specified doctorId in the request
exports.delete = (req, res) => {
  Especialidades.remove(req.params.doctorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra la especialidad con el codigo ${req.params.especialidad}.`
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo borrar la especialidad con el codigo " + req.params.especialidad
        });
      }
    } else res.send({ message: `la especialidad fue eliminada con éxito!` });
  });
};

// Delete all doctors from the database.
exports.deleteAll = (req, res) => {
  Especialidades.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todas las especialidades."
      });
    else
      res.send({ message: `Todos los doctors fueron eliminados con éxito!` });
  });
};
