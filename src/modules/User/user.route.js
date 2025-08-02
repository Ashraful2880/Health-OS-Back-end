const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/makeAdmin", userController.makeAdmin);

module.exports = router;
