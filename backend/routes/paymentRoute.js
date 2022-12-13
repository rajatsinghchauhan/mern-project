const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isauthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isauthenticatedUser, processPayment);

router.route("/stripeapikey").get(isauthenticatedUser, sendStripeApiKey);

module.exports = router;
