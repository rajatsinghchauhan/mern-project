const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  //handling cast error- error which happens when the length of id string doesn't match with the id for which request is made

  if (err.name == "CastError") {
    const message = `Resource not found . Invalid path ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
