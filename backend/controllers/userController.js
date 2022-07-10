const User = require("../models/userModels");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
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
  const token = user.getjwtToken();
  res.status(201).json({ succes: true, token });
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
  const token = user.getjwtToken();
  res.status(201).json({ succes: true, token });
});
