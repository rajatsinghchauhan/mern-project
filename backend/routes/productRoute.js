const express = require("express");
const {
  getallproducts,
  createnewproduct,
} = require("../controllers/productController");
const routes = express.Router();

routes.route("/products").get(getallproducts);
routes.route("/products/new").post(createnewproduct);
routes.route("/products/:id").put();
module.exports = routes;
