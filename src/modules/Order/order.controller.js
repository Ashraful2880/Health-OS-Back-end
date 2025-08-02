const Order = require('./order.model');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const result = await newOrder.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const orderStatus = req.body;
    const result = await Order.findByIdAndUpdate(
      id,
      { $set: { status: orderStatus.status } },
      { new: true, upsert: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
