import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  deleteJobPost,
  getAdminJobs,
  getAllJobs,
  getJobsById,
  postJob,
  updateJobPost,
} from "../controllers/job.Controller.js";
const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get/admins", isAuthenticated, getAdminJobs);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobsById);
router.post("/update/:id", isAuthenticated, updateJobPost);
router.delete("/delete/:id", isAuthenticated, deleteJobPost);

export default router;
