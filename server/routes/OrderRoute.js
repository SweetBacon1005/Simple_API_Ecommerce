const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
} = require("../controllers/OrderController");
const {protect, allowTo } = require("../controllers/AuthController")

router.get("/:id", getOrderById);
router.route("/:cartId").get(protect,allowTo("user"), getAllOrder).post(createOrder);
router.route("/:id/pay").put(protect,allowTo("user"), updateOrderToPaid);
router.route("/:id/deliver").put(protect,allowTo("admin"), updateOrderToDelivered);
router.route("/:id").delete(protect,allowTo("admin"), deleteOrder);
module.exports = router;
