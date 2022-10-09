const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  //handling cast error- error which happens when the length of id string doesn't match with the id for which request is made

  if (err.name == "CastError") {
    const message = `Resource not found . Invalid path ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  // to handle error for same email registered already
  if (err.statusCode == 11000) {
    const message = ` Duplicate ${Object.keys(
      err.keyValue
    )}  already registered`;
    err = new Errorhandler(message, 400);
  }

  // wrong jasonwebtoken
  if (err.name == "JsonWebTokenError") {
    const message = "Invalid Jason web-token";
    err = new Errorhandler(message, 401);
  }
  // webtoken expired
  if (err.name == "TokenExpiredError") {
    const message = " Jason webtoken expired try again";
    err = new Errorhandler(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
