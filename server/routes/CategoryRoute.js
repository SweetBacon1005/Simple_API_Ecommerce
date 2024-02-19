const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
router.post('/create', CategoryController.create);
router.get('/getAll', CategoryController.getAll);
router.get('/getById/:id', CategoryController.getById);
router.put('/update/:id', CategoryController.update);
router.delete('/delete/:id', CategoryController.delete);
module.exports = router;
