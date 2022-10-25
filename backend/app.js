const express = require("express");
const app = express();
const errormiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
// routes import

const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);

// error handler middleware
app.use(errormiddleware);
module.exports = app;
