const Product = require("./product.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Get Product Where Slug==="bestSellar"

exports.getBestSellingProducts = async (req, res) => {
  try {
    const products = await Product.find({ slug: "bestSellar" });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No best selling products found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch best selling products" });
  }
};

// Get Product Where Slug==="featured"
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ slug: "featured" });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No featured products found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
};

// Get Product Where Slug==="trending"
exports.getTopTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ slug: "trending" });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No trending products found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending products" });
  }
};

// Get New Arrival Products

exports.getNewArrivalProducts = async (req, res) => {
  try {
    const products = await Product.find({ slug: "newArrival" });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No new arrival products found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch new arrival products" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const products = await Product.find({
      category: { $regex: category, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const result = await newProduct.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateReq = req.body;
    const result = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          rating: updateReq.rating,
          name: updateReq.name,
          price: updateReq.price,
          offerPrice: updateReq.offerPrice,
          category: updateReq.category,
          slug: updateReq.slug,
          SKU: updateReq.SKU,
          productImage: updateReq.productImage,
        },
      },
      { new: true, upsert: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
