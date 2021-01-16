import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { processToken, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(processToken, addOrderItems)
  .get(processToken, admin, getOrders);
router.route("/myorders").get(processToken, getMyOrders);
router.route("/:id").get(processToken, getOrderById);
router.route("/:id/pay").put(processToken, updateOrderToPaid);
router.route("/:id/deliver").put(processToken, admin, updateOrderToDelivered);

export default router;
