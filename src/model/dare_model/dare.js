const mongoose = require("mongoose");

const dareSchema = new mongoose.Schema(
  {
    dare_name: {
      type: String,
      required: true,
    },
    suggested_by: {
      type: String,
      required: true,
    },
    suggested_to: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
    },
    created_at: {
      type: Date,
      default: Date.now
    },
  },
  { versionKey: false }
);

const Dare = mongoose.model("Dare", dareSchema);

module.exports = Dare;
