const express = require("express");

const {
  createUser,
  loginuser,
  logout,
  forgotpassword,
  resetPassword,
  getuserprofile,
} = require("../controllers/userController");
const { isauthenticatedUser } = require("../middleware/auth");
const routes = express.Router();

routes.route("/register").post(createUser);
routes.route("/userlogin").post(loginuser);
routes.route("/logout").get(logout);
routes.route("/password/forgot").post(forgotpassword);
routes.route("/password/reset/:token").put(resetPassword);
routes.route("/me").get(isauthenticatedUser, getuserprofile);
module.exports = routes;
