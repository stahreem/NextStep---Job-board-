import express from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.Controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompanies);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.post("/update/:id", isAuthenticated, updateCompany);

export default router;
