const asyncHandler = require("express-async-handler");
const { create } = require("../models/Order");
const Order = require("../models/Order");

// @desc create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    convenienceFee,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = await Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      convenienceFee,
      totalPrice,
    });
    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc get order by id
// @route POST /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "firstName lastName email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

module.exports = { addOrderItems, getOrderById };
