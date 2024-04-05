const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    const order = await Order.create({
      user: req.user._id,
      cartItems: cart.cartItems,
      totalCartPrice: cart.totalCartPrice,
      address: req.body.address,
      phone: req.body.phone,
    });
    await Cart.findByIdAndDelete(req.params.cartId);
    return res.status(201).json({
      success: true,
      order,
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.status = req.body.status;
    order.isPaid = true;
    order.paidAt = Date.now();
    const data = await order.save();
    return res.status(200).json({
      success: true,
      message: "Order paid",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const data = await order.save();
    return res.status(200).json({
      success: true,
      message: "Order delivered",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};
