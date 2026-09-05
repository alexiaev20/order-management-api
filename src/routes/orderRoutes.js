const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/order', authMiddleware, orderController.createOrder);
router.get('/order/list', authMiddleware, orderController.getAllOrders);
router.get('/order/:orderId', authMiddleware, orderController.getOrderById);
router.put('/order/:orderId', authMiddleware, orderController.updateOrder);
router.delete('/order/:orderId', authMiddleware, orderController.deleteOrder);

module.exports = router;
