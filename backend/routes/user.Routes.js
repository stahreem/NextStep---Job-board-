import express from "express";
import {
  login,
  logout,
  register,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {singleUpload } from "../utils/multer.js"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated,singleUpload, updateProfile);
router.get("/profile", isAuthenticated, getProfile);
router.post("/logout", logout);

export default router;
