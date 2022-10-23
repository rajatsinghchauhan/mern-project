const express = require("express");
const {
  getallproducts,
  createnewproduct,
  updateaproduct,
  deleteproduct,
  getsingleproduct,
  createreview,
  getallreviews,
  deletereview,
} = require("../controllers/productController");
const { isauthenticatedUser, authorizeRoles } = require("../middleware/auth");
const routes = express.Router();

routes.route("/products").get(getallproducts);
routes
  .route("/admin/products/new")
  .post(isauthenticatedUser, authorizeRoles("admin"), createnewproduct);
routes
  .route("/admin/products/:id")
  .put(isauthenticatedUser, authorizeRoles("admin"), updateaproduct)
  .delete(isauthenticatedUser, authorizeRoles("admin"), deleteproduct);

routes.route("/products/:id").get(getsingleproduct);

routes.route("/createreview").put(isauthenticatedUser, createreview);
routes.route("/allreviews").get(isauthenticatedUser, getallreviews);
routes.route("/deletereview").put(isauthenticatedUser, deletereview);
module.exports = routes;
