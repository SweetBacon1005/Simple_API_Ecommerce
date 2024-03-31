const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    amount: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card"],
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", OrderSchema);
