const { ObjectId } = require('mongodb');
const { connectDB } = require('../config/db');

// Helper to get Products collection
async function getProductsCollection() {
  const db = await connectDB();
  return db.collection(process.env.PRODUCT_COLLECTION);
}

exports.getAllProducts = async (req, res) => {
  try {
    const Products = await getProductsCollection();
    const products = await Products.find({}).toArray();
    res.send(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const Products = await getProductsCollection();
    const id = req.params.id;
    const product = await Products.findOne({ _id: ObjectId(id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const Products = await getProductsCollection();
    const newProduct = req.body;
    const result = await Products.insertOne(newProduct);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const Products = await getProductsCollection();
    const id = req.params.id;
    const updateReq = req.body;
    const result = await Products.updateOne(
      { _id: ObjectId(id) },
      { $set: {
        rating: updateReq.rating,
        name: updateReq.name,
        price: updateReq.price,
        offerPrice: updateReq.offerPrice,
        category: updateReq.category,
        slug: updateReq.slug,
        SKU: updateReq.SKU,
        productImage: updateReq.productImage,
      } },
      { upsert: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const Products = await getProductsCollection();
    const id = req.params.id;
    const result = await Products.deleteOne({ _id: ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
