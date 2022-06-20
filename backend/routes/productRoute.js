const express = require("express");
const { getallproducts } = require("../controllers/productController");
const routes = express.Router();

routes.route("/products").get(getallproducts);
module.exports = routes;
