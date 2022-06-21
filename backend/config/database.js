const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(data.connection.host);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
// const mongoose = require("mongoose");
// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   });
// };

// module.exports = connectDB;
