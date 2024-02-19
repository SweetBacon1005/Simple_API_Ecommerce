const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
router.post('/create', ProductController.create)
router.get('/{id}', ProductController.getById)
router.put('/update/{id}', ProductController.update)
router.delete('/delete/{id}', ProductController.delete)
router.get('/', ProductController.getAll)
module.exports = router;