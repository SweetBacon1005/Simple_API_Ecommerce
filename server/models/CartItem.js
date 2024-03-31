const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartItemSchema = new Schema(
  {
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalCartPrice: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("CartItem", CartItemSchema);
