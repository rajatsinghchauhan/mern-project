const express = require("express");
const app = express();
const errormiddleware = require("./middleware/error");

app.use(express.json());
// routes import

const products = require("./routes/productRoute");
app.use("/api/v1", products);

// error handler middleware
app.use(errormiddleware);
module.exports = app;
