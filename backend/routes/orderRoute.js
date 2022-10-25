const express = require("express");
const {
  createorder,
  getsingleorder,
  getallorderforauser,
  getallorder,
  updateorder,
  deleteorder,
} = require("../controllers/orderController");
const { isauthenticatedUser, authorizeRoles } = require("../middleware/auth");

const routes = express.Router();

routes.route("/createorder").post(isauthenticatedUser, createorder);
routes.route("/getsingleorder/:id").get(isauthenticatedUser, getsingleorder);
routes.route("/myorders").get(isauthenticatedUser, getallorderforauser);
routes
  .route("/admin/allorders")
  .get(isauthenticatedUser, authorizeRoles("admin"), getallorder);
routes
  .route("/admin/updateorder/:id")
  .put(isauthenticatedUser, authorizeRoles("admin"), updateorder);

routes
  .route("/admin/deleteorder/:id")
  .delete(isauthenticatedUser, authorizeRoles("admin"), deleteorder);
module.exports = routes;
