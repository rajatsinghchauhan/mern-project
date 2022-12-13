const User = require("../models/userModels");

const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendemail");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
// function register a new user and provide jwt token

exports.createUser = asyncerrorhandler(async (req, res, next) => {
  const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
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
    console.log("hello");
    return next(new Errorhandler("Invalid request, no user exist ", 401));
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

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resettoken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}password/reset/${resettoken}`;

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

exports.resetPassword = asyncerrorhandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler(
        "Invalid reset password link or it has been expired",
        400
      )
    );
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(
      new Errorhandler("password and confirm password does not match", 400)
    );
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res);
});

// get user profile details

exports.getuserprofile = asyncerrorhandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(201).json({
    success: true,
    user,
  });
});

// update user profile details
exports.updateuserprofile = asyncerrorhandler(async (req, res, next) => {
  const newuserinfo = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newuserinfo.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  let user = await User.findByIdAndUpdate(req.user.id, newuserinfo, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

// update user password
exports.updateuserpassword = asyncerrorhandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res);
});

// function to find total no of users

exports.totalusers = asyncerrorhandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role != "admin") {
    return next(
      new Errorhandler(
        "you dont have valid permission for getting this info",
        400
      )
    );
  }

  Ecommerce.users.count({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

//get all users details
exports.getallusers = asyncerrorhandler(async (req, res, next) => {
  // const user = await User.findById(req.user.id);
  // if (user.role != "admin") {
  //   return next(
  //     new Errorhandler(
  //       "you dont have valid permission for getting this info",
  //       400
  //     )
  //   );
  // }

  const users = await User.find();
  return res.status(200).json({
    success: true,
    users,
  });
});

//getsingle user details

exports.getsingleuser = asyncerrorhandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  return res.status(200).json({
    succes: true,
    user,
  });
});

// admin can update user details
exports.updateusers = asyncerrorhandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return new Errorhandler("user doesn't exist", 404);
  }
  const newuserinfo = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  user = await User.findByIdAndUpdate(req.params.id, newuserinfo, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ succes: true });
});

// admin can delete a user

exports.deleteuser = asyncerrorhandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return new Errorhandler(`user doesn't exist with id ${req.params.id}`, 404);
  }
  await user.remove();
  res.status(200).json({ succes: true });
});
