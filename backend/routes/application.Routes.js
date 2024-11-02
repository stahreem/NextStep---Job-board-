import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { applyJob, getApplications, getAppliedJobs, updateStatus } from "../controllers/application.Controller.js"
const router = express.Router()

router.post('/apply/:id', isAuthenticated, applyJob)
router.get('/get', isAuthenticated, getAppliedJobs)
router.get('/:id/applications', isAuthenticated, getApplications)
router.post('/status/:id/update', isAuthenticated, updateStatus)
export default router