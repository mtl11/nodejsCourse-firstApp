const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: { type: Number, require: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let qty = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    qty = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = qty;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() === productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.clearCart = function () {
  this.cart = {};
  return this.save();
}

module.exports = mongoose.model("User", userSchema);
