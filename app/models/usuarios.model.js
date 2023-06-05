const sql = require("./db.js");

// constructor
const Planes = function (doctor) {
  this.nombre = doctor.nombre;
};

Planes.create = (newdoctor, result) => {
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

Planes.findById = (asegurado_cedula, result) => {
  sql.query(
    `SELECT * FROM vw_reservaciones WHERE asegurado_cedula = ${asegurado_cedula}`,
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

Planes.getAll = (result) => {
  sql.query("SELECT * FROM vw_planes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("planes: ", res);
    result(null, res);
  });
};

Planes.updateById = (id, doctor, result) => {
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

Planes.remove = (id, result) => {
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

Planes.removeAll = (result) => {
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

module.exports = Planes;
