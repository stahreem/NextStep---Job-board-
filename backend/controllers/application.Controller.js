import { Job } from "../models/job.model.js";
import { Application } from "../models/application.Model.js";

// Apply for a Job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Validate jobId
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied",
        success: false,
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job post not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add application reference to the job
    job.application.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job application submitted successfully",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    console.error("Error in applyJob controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get Jobs Applied by a User
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
      });

    if (!applications.length) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    return res.status(200).json({ applications, success: true });
  } catch (error) {
    console.error("Error in getAppliedJobs controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get All Applications for a Specific Job
export const getApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "application",
        populate: { path: "applicant" },
      })
      .populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job post not found",
        success: false,
      });
    }

    return res.status(200).json({
      applications: job.application,
      jobTitle: job.title,
      company: job.company,
      success: true,
    });
  } catch (error) {
    console.error("Error in getApplications controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Update Application Status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // Check if the user is a recruiter
    if (req.role === "recruiter") {
      return res.status(403).json({
        message:
          "Only recruiters are authorized to update the application status.",
        success: false,
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Find the application by ID
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in updateStatus controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
