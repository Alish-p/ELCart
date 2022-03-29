const OrderModel = require('../models/Order');
const asyncHandler = require('express-async-handler');

// fetch all orders of user
module.exports.fetchOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id });
  res.status(200).json(orders);
});

// fetch order by orderID
module.exports.fetchOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    const err = new Error('No Order with this id.');
    err.status = 404;
    next(err);
  }
});

module.exports.createOrder = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;

  if (orderItems && orderItems.length <= 0) {
    const err = new Error('Order Items can not be empty');
    err.status = 400;
    next(err);
  } else {
    const response = await new OrderModel({
      ...req.body,
      user: req.user._id,
    }).save();

    res.status(201).json(response);
  }
});
module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id, status, update_time, payer } = req.body;
  const order = await OrderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address: payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    const err = new Error('No Order with this id.');
    err.status = 404;
    next(err);
  }
});
