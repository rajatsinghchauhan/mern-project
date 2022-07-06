const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
const Apifeatures = require("../utils/apifeatures");

// admin controller
exports.createnewproduct = asyncerrorhandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product: product });
});

exports.getallproducts = asyncerrorhandler(async (req, res) => {
  const resultperpage = 5;
  const productcount = await Product.countDocuments();
  const apifeatures = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);

  const products = await apifeatures.query;
  res.status(200).json({ success: true, products, productcount });
});
//admin controller
exports.updateaproduct = asyncerrorhandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("there is no product with this id", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteproduct = asyncerrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("there is no product with this id", 404));
  }
  await product.remove();
  return res.status(201).json({
    success: true,
    message: "product deleted",
  });
});

exports.getsingleproduct = asyncerrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("there is no product with this id", 404));
  }
  return res.status(201).json({
    success: true,
    product,
  });
});
