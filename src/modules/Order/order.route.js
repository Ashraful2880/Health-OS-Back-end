const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;
