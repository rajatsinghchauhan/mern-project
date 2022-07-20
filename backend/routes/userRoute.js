const express = require("express");

const {
  createUser,
  loginuser,
  logout,
} = require("../controllers/userController");
const routes = express.Router();

routes.route("/register").post(createUser);
routes.route("/userlogin").post(loginuser);
routes.route("/logout").get(logout);
module.exports = routes;
