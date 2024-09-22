
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');

router.post('/', ordersController.createOrder);
router.get('/orders', ordersController.getAllOrders);
router.delete('/orders/:id', ordersController.deleteOrder);
router.put('/orders/:id/validate', ordersController.validateOrder);

router.get('/orders/:id', ordersController.getOrderById); 
router.put('/orders/:id', ordersController.updateOrder); 

module.exports = router;

module.exports = router;

