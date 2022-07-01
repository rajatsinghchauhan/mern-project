const express = require("express");
const {
  getallproducts,
  createnewproduct,
  updateaproduct,
  deleteproduct,
  getsingleproduct,
} = require("../controllers/productController");
const routes = express.Router();

routes.route("/products").get(getallproducts);
routes.route("/products/new").post(createnewproduct);
routes
  .route("/products/:id")
  .put(updateaproduct)
  .delete(deleteproduct)
  .get(getsingleproduct);
module.exports = routes;
