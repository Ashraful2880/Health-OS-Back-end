const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: process.env.ORDER_COLLECTION || "orders" }
);

module.exports = mongoose.model("Order", orderSchema);
