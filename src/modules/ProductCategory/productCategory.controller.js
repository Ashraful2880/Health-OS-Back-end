const ProductCategory = require("./productCategory.model");

exports.getAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find({});
    res.send(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product categories" });
  }
};

exports.createProductCategory = async (req, res) => {
  try {
    const newCategory = new ProductCategory(req.body);
    const result = await newCategory.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product category" });
  }
};
