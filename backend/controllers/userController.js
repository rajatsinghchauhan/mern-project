const User = require("../models/userModels");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendemail");
// function register a new user and provide jwt token
exports.createUser = asyncerrorhandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a smaple",
      url: "this is a sample url",
    },
  });
  sendToken(user, 200, res);
});

// for user login

exports.loginuser = asyncerrorhandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Invalid request , no user exist ", 401));
  }
  const ispasswordmatched = await user.comparePassword(password);
  if (!ispasswordmatched) {
    return next(
      new Errorhandler("please enter valid  email and password", 401)
    );
  }
  sendToken(user, 201, res);
});

// function for logout

exports.logout = asyncerrorhandler(async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: false,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    msg: "logged out successfully",
  });
});

//function to forgot password

exports.forgotpassword = asyncerrorhandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Errorhandler("please enter a valid email", 404));
  }

  const resettoken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resettoken}`;

  const message = `Your url for reset password is \n \n ${resetPasswordUrl} \n \n if not requested please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password recovery email`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Password reset email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});
