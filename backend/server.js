const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/database");

dotenv.config({ path: "backend/config/config.env" });

// conneting the database
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT} `);
});
