// const mongoose = require("mongoose");

// const connectDB = () => {
//   mongoose
//     .connect(process.env.DB_URI, {
//       useNewUrlParser: true,
//       //   useCreateIndex: true,
//       //   useFindAndModify: false,
//       useUnifiedTopology: true,
//     })
//     .then((data) => {
//       console.log(data.connection.host);
//     });
// };

// module.exports = connectDB;
// // const mongoose = require("mongoose");
// // const connectDB = (url) => {
// //   return mongoose.connect(url, {
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// //     useFindAndModify: false,
// //     useUnifiedTopology: true,
// //   });
// // };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDB;
