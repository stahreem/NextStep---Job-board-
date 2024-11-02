import { Job } from "../models/job.model.js";

// Admin: Post a new job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      companyID,
    } = req.body;
    const userID = req.id;

    // Validate input
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experienceLevel ||
      !location ||
      !jobType ||
      !position ||
      !companyID
    ) {
      return res
        .status(400)
        .json({ message: "Fill all the required fields", success: false });
    }

    // Create new job
    const jobCreate = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel,
      location,
      jobType,
      position,
      company: companyID, // Ensure you are using the correct field name
      created_by: userID,
    });

    return res
      .status(201)
      .json({
        message: "New Job Created Successfully",
        jobCreate,
        success: true,
      });
  } catch (error) {
    console.error("The error in job post controller is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Admin: Get jobs posted by the admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No job posts found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("The error in get Admin Jobs controller is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Students: Get all available jobs
export const getAllJobs = async (req, res) => {
  try {
    // Filter jobs based on keyword
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No job posts found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("The error in get All Jobs controller is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get a specific job by ID
export const getJobsById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job post not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("The error in get Jobs By Id controller is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
