const { ObjectId } = require('mongodb');
const { connectDB } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getUsersCollection() {
  const db = await connectDB();
  return db.collection(process.env.USER_COLLECTION);
}

exports.signup = async (req, res) => {
  try {
    const Users = await getUsersCollection();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    };
    const findUser = await Users.findOne({ phone: req.body.phone });
    if (findUser) {
      return res.status(400).send({ message: 'User already exists' });
    } else {
      const result = await Users.insertOne(user);
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const Users = await getUsersCollection();
    const user = await Users.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(401).send({ message: 'Phone number or password is incorrect' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Phone number or password is incorrect' });
    }
    const token = jwt.sign({ phone: user.phone }, 'secret');
    res.send({ token, phone: user.phone });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const Users = await getUsersCollection();
    const users = await Users.find({}).toArray();
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const Users = await getUsersCollection();
    const newUser = req.body;
    const result = await Users.insertOne(newUser);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
