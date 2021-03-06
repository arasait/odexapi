const Doctor = require("../models/doctor.model.js");

// Create and Save a new doctor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
  }

  // Create a doctor
  const doctor = new doctor({
    name: req.body.nombre
  });

  // Save doctor in the database
  Doctor.create(doctor, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear el doctor."
      });
    else res.send(data);
  });
};

// Retrieve all doctors from the database.
exports.findAll = (req, res) => {
    Doctor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Se produjo un error al recuperar doctors."
        });
      else res.send(data);
    });
  };

// Find a single doctor with a doctorId
exports.findOne = (req, res) => {
    Doctor.findById(req.params.doctorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra doctor con el codigo ${req.params.doctorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error al recuperar doctor con el codigo " + req.params.doctorId
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
  
    Doctor.updateById(
      req.params.doctorId,
      new doctor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se encuentra doctor con el codigo ${req.params.doctorId}.`
            });
          } else {
            res.status(500).send({
              message: "Error al actualizar doctor con el codigo " + req.params.doctorId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a doctor with the specified doctorId in the request
exports.delete = (req, res) => {
    Doctor.remove(req.params.doctorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra doctor con el codigo ${req.params.doctorId}.`
          });
        } else {
          res.status(500).send({
            message: "No se pudo borrar doctor con el codigo " + req.params.doctorId
          });
        }
      } else res.send({ message: `doctor fue eliminado con éxito!` });
    });
  };

// Delete all doctors from the database.
exports.deleteAll = (req, res) => {
    Doctor.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Se produjo un error al eliminar todos los doctors."
        });
      else res.send({ message: `Todos los doctors fueron eliminados con éxito!` });
    });
  };
