import express from "express";
import { parseResume } from "../controllers/resumeParse.Controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/parse", isAuthenticated, parseResume);

export default router;
