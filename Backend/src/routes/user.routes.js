import { Router } from "express";
import {
  registeredUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserProfile,
  updateUserProfile,deleteUser
} from "../controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { deleteAdmin } from "../controllers/deleteAdmin.controller.js";

const router = Router();


router.post("/register", registeredUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);

router.get("/me", verifyJWT, getUserProfile);
router.patch("/me", verifyJWT, updateUserProfile);
router.delete("/:userId", verifyJWT, isAdmin, deleteUser);
router.delete("/admin/:userId", verifyJWT, isAdmin, deleteAdmin);

export default router;
