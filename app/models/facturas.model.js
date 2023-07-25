const sql = require("./db.js");

// constructor
const Facturas = function (nrocontrato) {
  this.nrocontrato = factura.nrocontrato;
};

Facturas.findById = (nrocontrato, result) => {
  sql.query(
    // `SELECT * FROM sp_app_facturas WHERE nrocontrato = ${nrocontrato}`,
    `SELECT * FROM sp_app_facturas WHERE nrocontrato = ${nrocontrato}`,
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

Facturas.getAll = (result) => {
  sql.query("SELECT * FROM sp_app_facturas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("facturas: ", res);
    result(null, res);
  });
};

module.exports = Facturas;
