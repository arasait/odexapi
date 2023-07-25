const sql = require("./db.js");

// constructor
const Cuentas = function (nrocontrato) {
  this.nrocontrato = cuenta.nrocontrato;
};

Cuentas.findById = (nrocontrato, result) => {
  sql.query(
    // `SELECT * FROM sp_app_facturas WHERE nrocontrato = ${nrocontrato}`,
    `CALL sp_app_estado_cta(${nrocontrato})`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found factura: ", res[0]);
        result(null, res);
        return;
      }

      // not found doctor with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Cuentas.getAll = (result) => {
  sql.query("SELECT * FROM sp_app_estado_cta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facturas: ", res);
    result(null, res);
  });
};

module.exports = Cuentas;
