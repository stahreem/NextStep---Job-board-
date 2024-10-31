import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { getAdminJobs, getAllJobs, getJobsById, postJob } from "../controllers/job.Controller.js"
const router = express.Router()

router.post('/post',isAuthenticated, postJob)
router.get('/get/admins', isAuthenticated,getAdminJobs)
router.get('/get',isAuthenticated, getAllJobs)
router.get('/get/:id',isAuthenticated, getJobsById)

export default router