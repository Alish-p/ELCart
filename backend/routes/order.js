const { Router } = require('express');
const {
  createOrder,
  fetchOrders,
  fetchOrder,
  updateOrderToPaid,
} = require('../controllers/orderController');
const { private } = require('../middlewares/Auth');
const router = Router();

router.post('/', private, createOrder);
router.get('/', private, fetchOrders);
router.get('/:id', private, fetchOrder);
router.put('/:id/pay', private, updateOrderToPaid);

module.exports = router;
