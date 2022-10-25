const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");

//function to create an order

exports.createorder = asyncerrorhandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// get single order

exports.getsingleorder = asyncerrorhandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new Errorhandler("no order exist with the entered id", 404));
  }
  res.status(201).json({
    success: true,
    order,
  });
});

//get all the order of logged in user

exports.getallorderforauser = asyncerrorhandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json({
    success: true,
    orders,
  });
});

// get all orders-- for admin

exports.getallorder = asyncerrorhandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalamount = 0;
  orders.forEach((ord) => {
    totalamount = totalamount + ord.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalamount,
    orders,
  });
});

// update order status--admin

exports.updateorder = asyncerrorhandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(
      new Errorhandler("you have already delivered this product", 400)
    );
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (item) => {
      const productId = item.product;
      let product = await Product.findById(productId);
      product.stock = product.stock - item.quantity;
      await product.save({ validateBeforeSave: false });
    });
  }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  return res.status(201).json({ success: true, order });
});

// delete a order

exports.deleteorder = asyncerrorhandler(async (req, res, next) => {
  const order = Order.findById(req.params.id);
  if (!order) {
    return next(new Errorhandler("there is no order with the given id", 404));
  }
  await order.remove();
  res.status(201).json({ success: true });
});
