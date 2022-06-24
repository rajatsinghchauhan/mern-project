const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  discription: {
    type: String,
    required: [true, "please enter description"],
  },
  price: {
    type: Number,
    required: [true, "please enter price"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: String,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "please enter product category"],
  },
  stock: {
    type: Number,
    default: 1,
    maxlength: [4, "cant have more than 10000 products"],
  },
  numofreviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
