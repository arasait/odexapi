const sql = require("./db.js");

// constructor
const Sucursal = function(sucursal) {
  this.email = sucursal.email;
  this.name = sucursal.name;
  this.active = sucursal.active;
};

sucursal.create = (newsucursal, result) => {
  sql.query("INSERT INTO sucursals SET ?", newsucursal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sucursal: ", { id: res.insertId, ...newsucursal });
    result(null, { id: res.insertId, ...newsucursal });
  });
};

sucursal.findById = (sucursalId, result) => {
  sql.query(`SELECT * FROM sucursals WHERE id = ${sucursalId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sucursal: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found sucursal with the id
    result({ kind: "not_found" }, null);
  });
};

sucursal.getAll = result => {
  sql.query("SELECT * FROM sucursals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sucursals: ", res);
    result(null, res);
  });
};

sucursal.updateById = (id, sucursal, result) => {
  sql.query(
    "UPDATE sucursals SET email = ?, name = ?, active = ? WHERE id = ?",
    [sucursal.email, sucursal.name, sucursal.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found sucursal with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated sucursal: ", { id: id, ...sucursal });
      result(null, { id: id, ...sucursal });
    }
  );
};

sucursal.remove = (id, result) => {
  sql.query("DELETE FROM sucursals WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found sucursal with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sucursal with id: ", id);
    result(null, res);
  });
};

sucursal.removeAll = result => {
  sql.query("DELETE FROM sucursals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sucursals`);
    result(null, res);
  });
};

module.exports = sucursal;