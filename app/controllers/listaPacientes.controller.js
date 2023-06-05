const Reservaciones = require("../models/listaPacientes.model.js");

// Create and Save a new reservacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
  }

  // Create a reservaciones
  const reservacion = new Reservaciones({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    nrocedula: parseInt(req.body.nrocedula),
    codciudad: parseInt(req.body.codciudad),
    email: req.body.email
  });

  // Save reservaciones in the database
  Reservaciones.create(reservacion, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear el paciente."
      });
    else res.send(data);
  });
};

// Retrieve all reservaciones from the database.
exports.findAll = (req, res) => {
  Reservaciones.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los pacientes."
      });
    else res.send(data);
  });
};

// Find a single doctor with a reservacionId
exports.findOne = (req, res) => {
  Reservaciones.findById(req.params.cedula, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `El paciente con CI ${req.params.cedula} aun no cuenta con los servicios de ODEX.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar  el paciente " + req.params.cedula
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

  Reservaciones.updateById(
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
            message:
              "Error al actualizar doctor con el codigo " + req.params.doctorId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a doctor with the specified doctorId in the request
exports.delete = (req, res) => {
  Reservaciones.remove(req.params.doctorId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra doctor con el codigo ${req.params.doctorId}.`
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo borrar doctor con el codigo " + req.params.doctorId
        });
      }
    } else res.send({ message: `doctor fue eliminado con éxito!` });
  });
};

// Delete all doctors from the database.
exports.deleteAll = (req, res) => {
  Reservaciones.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los doctors."
      });
    else
      res.send({ message: `Todos los doctors fueron eliminados con éxito!` });
  });
};
