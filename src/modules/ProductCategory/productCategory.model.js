const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: process.env.PRODUCT_CATEGORY_COLLECTION || "productcategories" }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
