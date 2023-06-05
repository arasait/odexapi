const sql = require("./db.js");

// constructor
const Contratos = function (doctor) {
  this.nombre = doctor.nombre;
};

Contratos.create = (newdoctor, result) => {
  sql.query(
    "INSERT INTO vw_contrato_asegurados SET ?",
    newdoctor,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created doctor: ", { id: res.insertId, ...newdoctor });
      result(null, { id: res.insertId, ...newdoctor });
    }
  );
};

Contratos.findById = (nrocedula, result) => {
  sql.query(
    `SELECT * FROM vw_contrato_asegurados LEFT JOIN vw_planes ON vw_planes.se_nombre = vw_contrato_asegurados.plan  
    WHERE nrocontrato = ${nrocedula}`,
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

Contratos.getAll = (result) => {
  sql.query(
    "SELECT * FROM vw_contrato_asegurados GROUP BY nrocontrato HAVING COUNT(nrocontrato) > 1",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("reservaciones: ", res);
      result(null, res);
    }
  );
};

Contratos.updateById = (id, doctor, result) => {
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

Contratos.remove = (id, result) => {
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

Contratos.removeAll = (result) => {
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

module.exports = Contratos;
