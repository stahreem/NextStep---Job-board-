import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  addBookMark,
  getBookmarkedJobs,
  getUserBookmarkedJobIds,
  removeBookmark,
} from "../controllers/bookMark.Controller.js";

const router = express.Router();

router.post("/:id", isAuthenticated, addBookMark);
router.delete("/:id", isAuthenticated, removeBookmark);
router.get("/all", isAuthenticated, getBookmarkedJobs);
router.get("/:id", isAuthenticated, getUserBookmarkedJobIds);

export default router;
