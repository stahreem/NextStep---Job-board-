import express from "express";
import {
  getFitScore,
  getRecommendations,
  recommendJobs,
} from "../controllers/recommendations.Controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.get("/recommendations", isAuthenticated, getRecommendations);
router.get("/recommend", isAuthenticated, recommendJobs);
router.get("/fit-score/:jobId/:userId", getFitScore);

export default router;
