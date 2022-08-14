const Errorhandler = require("../utils/errorhandler");
const asyncerrorhandler = require("../middleware/asynErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
exports.isauthenticatedUser = asyncerrorhandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new Errorhandler("please login with credentials to do this task", 401)
    );
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodeData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(`Role: ${req.user.role} doesn't have permission`, 403)
      );
    }
    next();
  };
};
