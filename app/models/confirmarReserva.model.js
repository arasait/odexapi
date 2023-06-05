const sql = require("./db.js");

// constructor
const Reservaciones = function (reservacion) {
  this.cod_paciente = reservacion.cod_paciente;
  this.cod_consultorio = reservacion.cod_consultorio;
  this.cod_doctor = reservacion.cod_doctor;
  this.horario = reservacion.horario;
  this.fecha = reservacion.fecha;
  this.cedula = reservacion.cedula;
};

Reservaciones.create = (newReservacion, result) => {
  sql.query(
    "CALL vw_reserva_confirmar_app ( ?,?,?,?,? )",
    [
      newReservacion.cedula,
      newReservacion.cod_consultorio,
      newReservacion.cod_doctor,
      newReservacion.horario,
      newReservacion.fecha
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created reservacion doctor: ", {
        id: res.id,
        ...newReservacion
      });
      result(null, { id: res.id, ...newReservacion });
    }
  );
};

Reservaciones.findById = (cedula, result) => {
  sql.query(
    `SELECT * FROM vw_reserva_confirmar_app WHERE cedula = ${cedula}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found doctor: ", res[0]);
        result(null, res);
        return;
      }

      // not found doctor with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Reservaciones.getAll = result => {
  sql.query("SELECT * FROM vw_reserva_confirmar_app", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reservaciones: ", res);
    result(null, res);
  });
};

Reservaciones.updateById = (id, reservacion, result) => {
  sql.query(
    "CALL sp_confirmar_reserva_app ( ? )",
    [id, reservacion.nro_reserva],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found doctor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated agendamiento: ", { id: id, ...reservacion });
      result(null, { id: id, ...reservacion });
    }
  );
};

Reservaciones.remove = (id, result) => {
  sql.query("CALL vw_reserva_confirmar_app(?)", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found doctor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted agendamiento with id: ", id);
    result(null, res);
  });
};

Reservaciones.removeAll = result => {
  sql.query("DELETE FROM vw_reserva_confirmar_app", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} doctors`);
    result(null, res);
  });
};

module.exports = Reservaciones;
