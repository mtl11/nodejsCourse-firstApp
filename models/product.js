const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, require: true },
  price: {
    type: Number,
    required: true,
  },
  description: { type: String, require: true },
  imageURL: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Product", productSchema);