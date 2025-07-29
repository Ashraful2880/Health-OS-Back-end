const { ObjectId } = require('mongodb');
const { connectDB } = require('../config/db');

async function getCustomersCollection() {
  const db = await connectDB();
  return db.collection(process.env.CUSTOMER_COLLECTION);
}

exports.getAllCustomers = async (req, res) => {
  try {
    const Customers = await getCustomersCollection();
    const customers = await Customers.find({}).toArray();
    res.send(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const Customers = await getCustomersCollection();
    const id = req.params.id;
    const customer = await Customers.findOne({ _id: ObjectId(id) });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const Customers = await getCustomersCollection();
    const newCustomer = req.body;
    const result = await Customers.insertOne(newCustomer);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const Customers = await getCustomersCollection();
    const id = req.params.id;
    const result = await Customers.deleteOne({ _id: ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};
