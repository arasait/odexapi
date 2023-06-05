const sql = require("./db.js");

// constructor
const Config = function (config) {
  this.nombre = config.nombre;
};

Config.getAll = result => {
  sql.query("SELECT * FROM vw_config_reservas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("config: ", res);
    result(null, res);
  });
};

module.exports = Config;
