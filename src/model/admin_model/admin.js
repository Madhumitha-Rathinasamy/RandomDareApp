const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email is required"],
    },
    full_name: {
      type: String,
      require: [true, "full name is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
      minlength: 8,
    },
    auth_token: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: "true",
    },
    logged_in: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
