const express = require("express");

const {
  createUser,
  loginuser,
  logout,
  forgotpassword,
  resetPassword,
} = require("../controllers/userController");
const routes = express.Router();

routes.route("/register").post(createUser);
routes.route("/userlogin").post(loginuser);
routes.route("/logout").get(logout);
routes.route("/password/forgot").post(forgotpassword);
routes.route("/password/reset/:token").put(resetPassword);
module.exports = routes;
