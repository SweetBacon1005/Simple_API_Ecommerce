const express = require('express');
const router = express.Router();
const { create, getAll, getById, update, deleteById } = require('../controllers/ProductController');
router.delete('/:id', deleteById);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/', create);
router.get('/', getAll);
module.exports = router;