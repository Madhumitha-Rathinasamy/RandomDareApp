const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    full_name: {
      type: String,
    },
    kyc_documents: {
      type: []
    },
    profile_image: {
      type: String,
    },
    gender: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
      required: true,
    },
    auth_token: {
      type: String,
    },
    logged_in: {
      type: Boolean,
      default: false,
    },
    admin_approval: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    signed_up: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: String
      }
    ],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
