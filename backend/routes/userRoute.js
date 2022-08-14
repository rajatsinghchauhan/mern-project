const express = require("express");

const {
  createUser,
  loginuser,
  logout,
  forgotpassword,
} = require("../controllers/userController");
const routes = express.Router();

routes.route("/register").post(createUser);
routes.route("/userlogin").post(loginuser);
routes.route("/logout").get(logout);
routes.route("/password/forgot").post(forgotpassword);
module.exports = routes;
