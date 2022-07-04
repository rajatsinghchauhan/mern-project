const app = require("./app");
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
