const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
router.get('/{id}', ProductController.getById)
router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
module.exports = router;