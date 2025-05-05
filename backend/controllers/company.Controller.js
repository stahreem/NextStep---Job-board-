import { log } from "console";
import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Register a new company
import { User } from "../models/user.model.js"; // Make sure this path is correct

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }

    // Optional: Fetch user from DB if you need role validation
    const user = await User.findById(req.id);
    if (!user || user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiter users can register a company",
        success: false,
      });
    }

    // Check if the company already exists
    let existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company is already registered",
        company: existingCompany,
        success: false,
      });
    }

    // Register the new company with userID
    const company = await Company.create({
      name: companyName,
      userID: req.id, // ✅ This is the field your schema requires
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("The error in registerCompany is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get all companies associated with the logged-in user

export const getCompanies = async (req, res) => {
  try {
    const userID = req.id; // Ensure req.id is the correct user ID
    const companies = await Company.find({ userID: userID }); // Use the correct field name "userID"

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("The error in getCompanies is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get a specific company by its ID
export const getCompanyById = async (req, res) => {
  try {
    const { id: companyId } = req.params;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("The error in getCompanyById is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Update an existing company's details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // console.log("Uploaded file:", file);

    let companyLogo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      companyLogo = cloudResponse.secure_url;
    }

    // Prepare update data
    const updateData = { name, description, website, location };
    if (companyLogo) {
      updateData.companyLogo = companyLogo; // Add companyLogo only if updated
    }

    // Update the company details
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied to updated fields
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company data updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("The error in updateCompany is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// delete existing company
export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the company exists
    const company = await Company.findById(id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    // Delete the company
    await company.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Company deleted successfully." });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete company. Please try again later.",
    });
  }
};
