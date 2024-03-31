const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const User = require("../models/User");
const createCartItem = async (req, res) => {
  const { product, quantity } = req.body;
  const user = req.user;
  if (!product || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product and quantity are required",
    });
  }
  try {
    const productFound = await Product.findById(product);
    if (!productFound) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    const cartItem = new CartItem({ product, quantity, user: user._id });
    await cartItem.save();
    return res.status(201).json({
      success: true,
      message: "Cart item created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const getCartItems = async (req, res) => {
  const user = req.user;
  try {
    const cartItems = await CartItem.find({ user: user._id }).populate(
      "product"
    );
    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({
      success: false,
      message: "Quantity is required",
    });
  }
  try {
    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(400).json({
        success: false,
        message: "Cart item not found",
      });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json({
      success: true,
      message: "Cart item updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(400).json({
        success: false,
        message: "Cart item not found",
      });
    }
    await cartItem.remove();
    return res.status(200).json({
      success: true,
      message: "Cart item deleted",
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
  createCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
