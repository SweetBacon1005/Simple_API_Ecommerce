const express = require('express')
const router = express.Router()
const { createCartItem, getCartItems, updateCartItem } = require('../controllers/CartItemController')
const { authenticate } = require('../middlewares/auth')
router.put('/:id', authenticate, updateCartItem)
router.post('/', authenticate, createCartItem)
router.get('/', authenticate, getCartItems)
module.exports = router