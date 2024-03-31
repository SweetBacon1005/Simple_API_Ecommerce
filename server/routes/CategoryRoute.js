const express = require("express");
const router = express.Router();
const { allowTo, protect } = require("../controllers/AuthController");
const {
  createCategory,
  getAllCategory,
  getByIdCategory,
  updateCategory,
  deleteByIdCategory,
} = require("../controllers/CategoryController");
router.route("/").get(getAllCategory).post(protect,allowTo("admin"), createCategory);
router
  .route("/:id")
  .get(getByIdCategory)
  .put(protect,allowTo("admin"), updateCategory)
  .delete(protect,allowTo("admin"), deleteByIdCategory);
module.exports = router;
