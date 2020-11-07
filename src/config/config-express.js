const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());
  consign({cwd: 'src'}).include("controllers").into(app);

  return app;
};
