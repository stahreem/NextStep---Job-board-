// Example in recommendations.Routes.js
import express from "express";
import { getRecommendations } from "../controllers/recommendations.Controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Define your route
router.get("/", isAuthenticated, getRecommendations);

export default router; // Export the router
