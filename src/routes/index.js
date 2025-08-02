const express = require("express");
const router = express.Router();

const userRoutes = require("../modules/User/user.route");
const blogRoutes = require("../modules/Blog/blog.route");
const orderRoutes = require("../modules/Order/order.route");
const productRoutes = require("../modules/Product/product.route");
const customerRoutes = require("../modules/Customers/customer.route");
const productCategoryRoutes = require("../modules/ProductCategory/productCategory.route");

router.use("/blogs", blogRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
router.use("/productsCategory", productCategoryRoutes);

module.exports = router;
