import express from "express";
import {
  getProductById,
  getProducts,
  getTopProducts,
  removeProduct,
  createProduct,
} from "../controllers/productController.js";
import { admin, processToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/top").get(getTopProducts);
router.route("/").get(getProducts).post(processToken, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(processToken, admin, removeProduct);

export default router;
