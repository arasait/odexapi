const sql = require("./db.js");

// constructor
const DoctorConsultorio = function(doctor) {
  this.nombre = doctor.nombre;
};

DoctorConsultorio.create = (newdoctor, result) => {
  sql.query("INSERT INTO vw_doctores SET ?", newdoctor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created doctor: ", { id: res.insertId, ...newdoctor });
    result(null, { id: res.insertId, ...newdoctor });
  });
};

DoctorConsultorio.findById = (consultorioCode, result) => {
  sql.query(`SELECT * FROM vw_doctores WHERE cod_consultorio = ${consultorioCode}`, (err, res) => {
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



DoctorConsultorio.getAll = result => {
  sql.query("SELECT * FROM vw_doctores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctors: ", res);
    result(null, res);
  });
};

DoctorConsultorio.updateById = (id, doctor, result) => {
  sql.query(
    "UPDATE vw_doctores SET nombre = ? WHERE codigo = ?",
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

DoctorConsultorio.remove = (id, result) => {
  sql.query("DELETE FROM vw_doctores WHERE codigo = ?", id, (err, res) => {
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

DoctorConsultorio.removeAll = result => {
  sql.query("DELETE FROM vw_doctores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} doctors`);
    result(null, res);
  });
};

module.exports = DoctorConsultorio;