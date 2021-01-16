import express from "express";

import {
  authUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { admin, processToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(processToken, admin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(processToken, getUserProfile)
  .put(processToken, updateUserProfile);
router
  .route("/:id")
  .get(getUserById)
  .delete(processToken, admin, deleteUser)
  .put(processToken, admin, updateUser);
router.route("/register").post(registerUser);

export default router;
