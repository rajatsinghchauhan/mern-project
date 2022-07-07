const User = require("../models/userModels");
const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");

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
  res.status(201).json({ succes: true, user: user });
});
