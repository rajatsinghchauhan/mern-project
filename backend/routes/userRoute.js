const express = require("express");

const {
  createUser,
  loginuser,
  logout,
  forgotpassword,
  resetPassword,
  getuserprofile,
  updateuserpassword,
  updateuserprofile,
  totalusers,
  getallusers,
  getsingleuser,
  updateusers,
  deleteuser,
} = require("../controllers/userController");
const { isauthenticatedUser, authorizeRoles } = require("../middleware/auth");
const routes = express.Router();

routes.route("/register").post(createUser);
routes.route("/userlogin").post(loginuser);
routes.route("/logout").get(logout);
routes.route("/password/forgot").post(forgotpassword);
routes.route("/password/reset/:token").put(resetPassword);
routes.route("/me").get(isauthenticatedUser, getuserprofile);
routes.route("/password/update").put(isauthenticatedUser, updateuserpassword);
routes.route("/userprofile/update").put(isauthenticatedUser, updateuserprofile);
routes.route("/admin/count").get(isauthenticatedUser, totalusers);
routes
  .route("/admin/allusers")
  .get(isauthenticatedUser, authorizeRoles("admin"), getallusers);
routes
  .route("/admin/user/:id")
  .get(isauthenticatedUser, authorizeRoles("admin"), getsingleuser)
  .put(isauthenticatedUser, authorizeRoles("admin"), updateusers)
  .delete(isauthenticatedUser, authorizeRoles("admin"), deleteuser);

module.exports = routes;
