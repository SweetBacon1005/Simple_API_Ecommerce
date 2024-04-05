const express = require("express");
const router = express.Router();
const { allowTo, protect } = require("../controllers/AuthController");
const { addProductToCart, getCartLoggedIn, deleteAllCartItems, removeSpecificCartItem, updateCartItemQuantity } = require("../controllers/CartController");

router.use(protect, allowTo('user'));  
router.route("/").post(addProductToCart).get(getCartLoggedIn).delete(deleteAllCartItems);
router.route('/:id').put(updateCartItemQuantity).delete(removeSpecificCartItem)

module.exports = router

