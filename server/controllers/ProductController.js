const Product = require("../models/Product");
const createProduct = async (req, res) => {
  const products = req.body;
  try {
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findOne({ name: products[i].name });
      if (product) {
        return res.status(400).json({
          success: false,
          message: "Product already exists",
        });
      }
      const newProduct = new Product(products[i]);
      await newProduct.save();
    }
    return res.status(201).json({
      success: true,
      message: "Product created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, category } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.category = category;
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const deleteByIdProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted",
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
  createProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
  deleteByIdProduct,
};
