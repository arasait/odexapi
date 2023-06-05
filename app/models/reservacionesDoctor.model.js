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
    "CALL sp_insert_agenda_doctor ( ?,?,?,?,? )",
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

Reservaciones.findById = (nro_reserva, result) => {
  sql.query(
    `SELECT * FROM vw_reservaciones WHERE cod_doctor = ${nro_reserva} ORDER BY fecha DESC`,
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
  sql.query("SELECT * FROM vw_reservaciones", (err, res) => {
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
    "CALL sp_update_reserva ( ?,? )",
    [id, reservacion.fecha],
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
  sql.query("CALL sp_delete_reserva(?)", id, (err, res) => {
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
  sql.query("DELETE FROM vw_reservaciones", (err, res) => {
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
