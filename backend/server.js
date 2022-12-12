const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/database");

dotenv.config({ path: "backend/config/config.env" });
// handling uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`Error is ${err.message}`);
  console.log(" shutting down due to uncaught excpetion error ");
  server.close(() => {
    process.exit(1);
  });
});
// console.log(hello);- this is an uncaught error as hello is not defined
// conneting the database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT} `);
});

//handling unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`error is : ${err.message}`);
  console.log(
    " shutting the damn server down because of unhandled promise rejection "
  );

  server.close(() => {
    process.exit(1);
  });
});
