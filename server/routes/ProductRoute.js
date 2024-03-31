const express = require("express");
const router = express.Router();
const {protect, allowTo } = require("../controllers/AuthController");
const {
  createProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
  deleteByIdProduct,
} = require("../controllers/ProductController");
router.route("/").get(getAllProduct).post(protect, allowTo("admin"), createProduct);
router
  .route("/:id")
  .get(getByIdProduct)
  .put(protect,allowTo("admin"), updateProduct)
  .delete(protect,allowTo("admin"), deleteByIdProduct);
module.exports = router;
