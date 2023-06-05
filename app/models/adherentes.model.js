const sql = require("./db.js");

// constructor
const Contratos = function (doctor) {
  this.nombre = doctor.nombre;
};

Contratos.findById = (nrocontrato, result) => {
  sql.query(
    `SELECT * FROM vw_adherentes WHERE nrocontrato = ${nrocontrato}`,
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
  sql.query("SELECT * FROM vw_adherentes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reservaciones: ", res);
    result(null, res);
  });
};

module.exports = Contratos;
