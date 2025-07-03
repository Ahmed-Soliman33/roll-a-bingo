const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter package name"],
    unique: [true, "Package name already exists"],
  },
  price: {
    type: Number,
    required: [true, "Please enter package price"],
  },
  andThenPricePerYear: {
    type: Number,
    required: [true, "Please enter package price per year"],
  },
  description: {
    type: String,
    required: [true, "Please enter package description"],
  },
  features: {
    type: [
      {
        name: { type: String, required: [true, "Feature name is required"] },
        active: { type: Boolean, default: true },
      },
    ],
    required: [true, "Please enter package features"],
  },
});

module.exports = mongoose.model("Package", packageSchema);
