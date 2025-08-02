const Customer = require("./customer.model");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const result = await newCustomer.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create customer" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Customer.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
};
