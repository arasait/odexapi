const sql = require("./db.js");

// constructor
const Reservaciones = function (reservacion) {
  this.nombre = reservacion.nombre;
  this.apellido = reservacion.apellido;
  this.direccion = reservacion.direccion;
  this.telefono = reservacion.telefono;
  this.nrocedula = reservacion.nrocedula;
  this.codciudad = reservacion.codciudad;
  this.email = reservacion.email;
};

Reservaciones.findById = (cedula, result) => {
  sql.query(
    `SELECT * FROM vw_lista_dentalcard WHERE cedula = ${cedula}`,
    (err, res) => {
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
    }
  );
};

Reservaciones.getAll = (result) => {
  sql.query("SELECT * FROM vw_lista_dentalcard", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reservaciones: ", res);
    result(null, res);
  });
};

module.exports = Reservaciones;
