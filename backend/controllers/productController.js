const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
const Apifeatures = require("../utils/apifeatures");

// admin controller
exports.createnewproduct = asyncerrorhandler(async (req, res, next) => {
  req.body.user = req.user.id;
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

// create a review or update a review

exports.createreview = asyncerrorhandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofreviews = product.reviews.length;
  }
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(201).json({
    success: true,
  });
});

// get all reviews of a product

exports.getallreviews = asyncerrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new Errorhandler("there is no product with this id", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// delete a review

exports.deletereview = asyncerrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new Errorhandler("no product exist with this id", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numofreviews = reviews.length;
  let sum = 0;
  reviews.forEach((rev) => {
    sum = sum + rev.rating;
  });
  const rating = sum / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numofreviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(201).json({
    success: true,
  });
});
