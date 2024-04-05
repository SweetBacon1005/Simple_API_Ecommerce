const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/OrderController");
const { allowTo, protect } = require("../controllers/AuthController");

router.use(protect);
router.post("/:cartId", createOrder);
router.get("/:id", getOrderById);

router.use(allowTo("admin", "moderator"));
router.put("/updateToPaid/:id", updateOrderToPaid);
router.put("/updateToDelivered/:id", updateOrderToDelivered);
router.get("/", getAllOrder)

module.exports = router;
