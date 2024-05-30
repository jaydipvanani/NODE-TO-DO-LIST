let express = require("express");
let routes = express.Router();
let user = require("./user.route");

routes.use("/user" , user);

module.exports = routes;