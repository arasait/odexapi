const sql = require("./db.js");

// constructor
const Consultorio = function(consultorio) {
  this.nombre = consultorio.nombre;
};

Consultorio.create = (newconsultorio, result) => {
  sql.query("INSERT INTO vw_consultorios SET ?", newconsultorio, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created consultorio: ", { id: res.insertId, ...newconsultorio });
    result(null, { id: res.insertId, ...newconsultorio });
  });
};

Consultorio.findById = (consultorioId, result) => {
  sql.query(`SELECT * FROM vw_consultorios WHERE codigo = ${consultorioId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found consultorio: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found consultorio with the id
    result({ kind: "not_found" }, null);
  });
};

Consultorio.getAll = result => {
  sql.query("SELECT * FROM vw_consultorios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("consultorios: ", res);
    result(null, res);
  });
};

Consultorio.updateById = (id, consultorio, result) => {
  sql.query(
    "UPDATE vw_consultorios SET nombre = ? WHERE codigo = ?",
    [consultorio.email, consultorio.name, consultorio.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found consultorio with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated consultorio: ", { id: id, ...consultorio });
      result(null, { id: id, ...consultorio });
    }
  );
};

Consultorio.remove = (id, result) => {
  sql.query("DELETE FROM vw_consultorios WHERE codigo = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found consultorio with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted consultorio with id: ", id);
    result(null, res);
  });
};

Consultorio.removeAll = result => {
  sql.query("DELETE FROM vw_consultorios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} consultorios`);
    result(null, res);
  });
};

module.exports = Consultorio;