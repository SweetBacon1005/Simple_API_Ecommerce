const express = require("express");
const router = express.Router();
const { allowTo } = require("../controllers/AuthController");
const {
  createCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/CartItemController");
router.route("/").get(getCartItems).post(allowTo("user"), createCartItem);
router
  .route("/:id")
  .put(allowTo("user"), updateCartItem)
  .delete(allowTo("user"), deleteCartItem);
module.exports = router;
