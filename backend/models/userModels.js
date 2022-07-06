const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
    maxLength: [40, " name can't be greater than 40 characters"],
    minLength: [4, " name can't be smaller than 4 character "],
  },
  email: {
    type: String,
    requires: [true, " please enter the email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    require: [true, "please enter the password "],
    minLength: [8, "PASSWORD should be greater than 8 "],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
