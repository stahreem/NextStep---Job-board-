import { Company } from "../models/company.model.js";

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is required",
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

        // Register the new company
        const company = await Company.create({
            name: companyName,
            userID: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });

    } catch (error) {
        console.error("The error in registerCompany is:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Get all companies associated with the logged-in user
export const getCompanies = async (req, res) => {
    try {
        const userID = req.id;
        const companies = await Company.find({ userID });

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
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

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
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// Update an existing company's details
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };

        // Update the company details
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

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
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
