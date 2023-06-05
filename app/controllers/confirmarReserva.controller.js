const Reservaciones = require("../models/confirmarReserva.model.js");

// Create and Save a new reservacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
  }
  // Create a Reservation
  const reservacion = new Reservaciones({
    cedula: parseInt(req.body.cedula),
    cod_consultorio: parseInt(req.body.cod_consultorio),
    cod_doctor: parseInt(req.body.cod_doctor),
    horario: req.body.horario,
    fecha: req.body.fecha
  });

  // Save reservacion in the database
  Reservaciones.create(reservacion, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo un error al crear la Reservacion."
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
          err.message || "Se produjo un error al recuperar las reservaciones."
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
          message: `No se encuentra la cedula ${req.params.cedula}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar  la cedula " + req.params.cedula
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
    req.params.nro_reserva,
    new Reservaciones(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra el agendamiento con el codigo ${req.params.nro_reserva}.`
          });
        } else {
          res.status(500).send({
            message:
              "Error al actualizar el agendamiento con el codigo " +
              req.params.nro_reserva
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a doctor with the specified doctorId in the request
exports.delete = (req, res) => {
  Reservaciones.remove(parseInt(req.params.nro_reserva), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra el agendamiento con el codigo ${req.params.nro_reserva}.`
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo borrar el agendamiento con el codigo " +
            req.params.nro_reserva
        });
      }
    } else res.send({ message: `el agendamiento fue eliminado con éxito!` });
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
