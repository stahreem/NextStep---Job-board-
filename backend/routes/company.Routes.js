import express from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.Controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {singleUpload } from "../utils/multer.js"

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompanies);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.post("/update/:id", isAuthenticated, singleUpload, updateCompany);
router.delete("/delete/:id", isAuthenticated, deleteCompany);

export default router;
