const sql = require("./db.js");

// constructor
const Agendamientos = function(doctor) {
  this.nombre = doctor.nombre;
};

Agendamientos.create = (newdoctor, result) => {
  sql.query("INSERT INTO vw_reservaciones SET ?", newdoctor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created doctor: ", { id: res.insertId, ...newdoctor });
    result(null, { id: res.insertId, ...newdoctor });
  });
};

Agendamientos.findById = (asegurado_cedula, result) => {
  sql.query(`SELECT * FROM vw_reservaciones WHERE asegurado_cedula = ${asegurado_cedula}`, (err, res) => {
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
  });
};



Agendamientos.getAll = result => {
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

Agendamientos.updateById = (id, doctor, result) => {
  sql.query(
    "UPDATE vw_reservaciones SET nombre = ? WHERE codigo = ?",
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

Agendamientos.remove = (id, result) => {
  sql.query("DELETE FROM vw_reservaciones WHERE codigo = ?", id, (err, res) => {
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

Agendamientos.removeAll = result => {
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

module.exports = Agendamientos;