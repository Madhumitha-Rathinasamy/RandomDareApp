const mongoose = require("mongoose");

const otpSch = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 300 },
    },
  },
  { timestamps: true }
);

const otp = mongoose.model("otp", otpSch);

module.exports = { otp };
