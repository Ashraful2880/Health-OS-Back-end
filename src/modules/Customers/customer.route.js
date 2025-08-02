const express = require("express");
const router = express.Router();
const customerController = require("./customer.controller");

router.get("/", customerController.getAllCustomers);
router.post("/", customerController.createCustomer);
router.get("/:id", customerController.getCustomerById);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
