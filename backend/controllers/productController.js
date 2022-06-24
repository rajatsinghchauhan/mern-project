const Product = require("../models/productModel");

// admin controller
exports.createnewproduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product: product });
};

exports.getallproducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
};
//admin controller
exports.updateaproduct = async (req, res) => {
  let product = await Product.findById(req.params);
  if (product) {
  }
};
