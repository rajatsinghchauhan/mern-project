const express = require("express");

const { createUser, loginuser } = require("../controllers/userController");
const routes = express.Router();

routes.route("/register").post(createUser);
routes.route("/userlogin").post(loginuser);

module.exports = routes;
