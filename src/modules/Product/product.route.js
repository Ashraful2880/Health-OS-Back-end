const express = require("express");
const router = express.Router();
const productController = require("./product.controller");


// Specific product routes first
router.get("/featured", productController.getFeaturedProducts);
router.get("/newArrival", productController.getNewArrivalProducts);
router.get("/topTrending", productController.getTopTrendingProducts);
router.get("/bestSelling", productController.getBestSellingProducts);
router.get("/findProducts", productController.getProductsByCategory);

// Generic product routes
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
