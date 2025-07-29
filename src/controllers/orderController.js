const { ObjectId } = require('mongodb');
const { connectDB } = require('../config/db');

async function getOrdersCollection() {
  const db = await connectDB();
  return db.collection(process.env.ORDER_COLLECTION);
}

exports.getAllOrders = async (req, res) => {
  try {
    const Orders = await getOrdersCollection();
    const orders = await Orders.find({}).toArray();
    res.send(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const Orders = await getOrdersCollection();
    const newOrder = req.body;
    const result = await Orders.insertOne(newOrder);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const Orders = await getOrdersCollection();
    const id = req.params.id;
    const orderStatus = req.body;
    const result = await Orders.updateOne(
      { _id: ObjectId(id) },
      { $set: { status: orderStatus.status } },
      { upsert: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
