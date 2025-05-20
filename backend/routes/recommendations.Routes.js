import express from "express";
import { getRecommendations } from "../controllers/recommendations.Controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.get("/", isAuthenticated, getRecommendations);

export default router;
