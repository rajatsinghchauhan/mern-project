const express = require("express");
const {
  getallproducts,
  createnewproduct,
  updateaproduct,
  deleteproduct,
  getsingleproduct,
} = require("../controllers/productController");
const { isauthenticatedUser, authorizeRoles } = require("../middleware/auth");
const routes = express.Router();

routes.route("/products").get(getallproducts);
routes
  .route("/products/new")
  .post(isauthenticatedUser, authorizeRoles("admin"), createnewproduct);
routes
  .route("/products/:id")
  .put(isauthenticatedUser, authorizeRoles("admin"), updateaproduct)
  .delete(isauthenticatedUser, authorizeRoles("admin"), deleteproduct)
  .get(getsingleproduct);
module.exports = routes;
