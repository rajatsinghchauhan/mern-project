const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
// to not change password everytime you modify info
// only change whne password modification request is done
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt tocken so that after registration, user can stay logged in instead of entering credentials again

userSchema.methods.getjwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_DATE,
  });
};
//method to compare password entered by user and saved password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);

//method to reset password

userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
