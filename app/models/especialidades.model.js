const sql = require("./db.js");

// constructor
const Especialidad = function(especialidad) {
  this.nombre = especialidad.nombre;
};

Especialidad.create = (newespecialidad, result) => {
  sql.query("INSERT INTO vw_especialidades SET ?", newespecialidad, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created especialidad: ", { id: res.insertId, ...newespecialidad });
    result(null, { id: res.insertId, ...newespecialidad });
  });
};

Especialidad.findById = (especialidadId, result) => {
  sql.query(`SELECT * FROM vw_especialidades WHERE codigo = ${especialidadId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found especialidad: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found especialidad with the id
    result({ kind: "not_found" }, null);
  });
};

Especialidad.getAll = result => {
  sql.query("SELECT * FROM vw_especialidades", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("especialidads: ", res);
    result(null, res);
  });
};

Especialidad.updateById = (id, especialidad, result) => {
  sql.query(
    "UPDATE vw_especialidades SET nombre = ? WHERE codigo = ?",
    [especialidad.email, especialidad.name, especialidad.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found especialidad with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated especialidad: ", { id: id, ...especialidad });
      result(null, { id: id, ...especialidad });
    }
  );
};

Especialidad.remove = (id, result) => {
  sql.query("DELETE FROM vw_especialidades WHERE codigo = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found especialidad with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted especialidad with id: ", id);
    result(null, res);
  });
};

Especialidad.removeAll = result => {
  sql.query("DELETE FROM vw_especialidades", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} especialidads`);
    result(null, res);
  });
};

module.exports = Especialidad;