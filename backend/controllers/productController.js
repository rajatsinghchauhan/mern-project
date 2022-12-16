const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
const Apifeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// admin controller
exports.createnewproduct = asyncerrorhandler(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product: product });
});

// Get All Product (Admin)
exports.getAdminProducts = asyncerrorhandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
exports.getallproducts = asyncerrorhandler(async (req, res, next) => {
  const resultperpage = 8;
  const productcount = await Product.countDocuments();
  const apifeatures = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);

  const products = await apifeatures.query;
  res
    .status(200)
    .json({ success: true, products, productcount, resultperpage });
});
//admin controller update a product
exports.updateaproduct = asyncerrorhandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("there is no product with this id", 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
  let rating = 0;
  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = sum / reviews.length;
  }

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
