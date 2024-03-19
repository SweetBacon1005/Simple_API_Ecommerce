const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    phone: {
      type: String,
      require: true,
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Credit Card"],
        default: "COD",
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", OrderSchema);
