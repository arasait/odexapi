const sql = require("./db.js");

// constructor
const Reservaciones = function(reservacion) {
  this.nombre= reservacion.nombre;
  this.apellido= reservacion.apellido;
  this.direccion= reservacion.direccion;
  this.telefono= reservacion.telefono;
  this.nrocedula= reservacion.nrocedula;
  this.codciudad= reservacion.codciudad;
  this.email= reservacion.email;
};

Reservaciones.create = (newReservacion, result) => {
  sql.query(
    "CALL sp_insert_paciente (?,?,?,?,?,?,?)",
    [
      newReservacion.nombre,
      newReservacion.apellido,
      newReservacion.direccion,
      newReservacion.telefono,
      newReservacion.nrocedula,
      newReservacion.codciudad,
      newReservacion.email
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created paciente: ", {
        id: res.nrocedula,
        ...newReservacion
      });
      result(null, { id: res.nrocedula, ...newReservacion });
    }
  );
};


Reservaciones.findById = (cedula, result) => {
  sql.query(`SELECT * FROM vw_lista_pacientes WHERE cedula = ${cedula}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Asegurado: ", res[0]);
      result(null, res);
      return;
    }

    // not found doctor with the id
    result({ kind: "not_found" }, null);
  });
};



Reservaciones.getAll = result => {
  sql.query("SELECT * FROM vw_lista_pacientes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reservaciones: ", res);
    result(null, res);
  });
};

Reservaciones.updateById = (id, doctor, result) => {
  sql.query(
    "UPDATE vw_lista_pacientes SET nombre = ? WHERE codigo = ?",
    [doctor.email, doctor.name, doctor.active, id],
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

      console.log("updated doctor: ", { id: id, ...doctor });
      result(null, { id: id, ...doctor });
    }
  );
};

Reservaciones.remove = (id, result) => {
  sql.query("DELETE FROM vw_lista_pacientes WHERE codigo = ?", id, (err, res) => {
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

    console.log("deleted doctor with id: ", id);
    result(null, res);
  });
};

Reservaciones.removeAll = result => {
  sql.query("DELETE FROM vw_lista_pacientes", (err, res) => {
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