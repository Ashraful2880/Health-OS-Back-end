const User = require('./user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


exports.signup = async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const phone = String(req.body.phone).trim();
    const user = new User({
      phone: phone,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });
    const findUser = await User.findOne({ phone });
    if (findUser) {
      return res.status(400).send({ message: "User already exists" });
    } else {
      const result = await user.save();
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    // Normalize phone number to string and trim whitespace
    const phone = String(req.body.phone);
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Phone number or password is incorrect" });
    }
    const token = jwt.sign(
      {
        phone: user.phone,
      },
      "secret"
    );
    res.send({
      token,
      name: user?.name,
      role: user?.role,
      phone: user.phone,
      email: user?.email,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const Users = await getUsersCollection();
    const newUser = req.body;
    const result = await Users.insertOne(newUser);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(200).json({ message: "User is already an admin" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "Admin Added Successful" });
  } catch (err) {
    res.status(500).json({ error: "Failed to make user admin" });
  }
};
