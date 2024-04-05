const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

const cartTotalPrice = async (cart) => {
  let totalPrice = 0;
  for (let item of cart.cartItems) {
    const product = await Product.findById(item.product);
    totalPrice += product.price * item.quantity;
  }
  return totalPrice;
};

const addProductToCart = async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [{ product: productId }],
      });
    } else {
      const cartIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );
      if (cartIndex > -1) {
        const cartItem = cart.cartItems[cartIndex];
        cartItem.quantity += 1;
        cart.cartItems[cartIndex] = cartItem;
      } else {
        cart.cartItems.push({ product: productId });
      }
    }
    cart.totalCartPrice = await cartTotalPrice(cart);
    await cart.save();
    return res.status(201).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getCartLoggedIn = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const deleteAllCartItems = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    return res.status(200).json({
      success: true,
      message: "Cart items deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const removeSpecificCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { cartItems: { _id: req.params.id } } },
      { new: true }
    );
    cart.totalCartPrice = await cartTotalPrice(cart);
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({
      success: false,
      message: "Quantity is required",
    });
  }
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const cartIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === req.params.id
    );
    if (cartIndex > -1) {
      cart.cartItems[cartIndex].quantity = quantity;
      cart.totalCartPrice = await cartTotalPrice(cart);
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Cart item quantity updated",
      });
    }
    return res.status(404).json({
      success: false,
      message: "Cart item not found",
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
  addProductToCart,
  getCartLoggedIn,
  deleteAllCartItems,
  removeSpecificCartItem,
  updateCartItemQuantity,
};
