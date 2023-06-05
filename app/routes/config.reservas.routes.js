module.exports = app => {
  const planes = require("../controllers/config.controller.js");

  // Retrieve all planes
  app.get("/config", planes.findAll);
};
