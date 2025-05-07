import { Job } from "../models/job.model.js";
import { Bookmark } from "../models/bookMark.model.js";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

import { ParsedJob } from "../models/parsedJobData.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jobScriptPath = path.join(__dirname, "..", "job_parser", "job_parser.py");

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

    const jobCreate = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel,
      location,
      jobType,
      position,
      company: companyID,
      created_by: userID,
    });

    // ✅ Trigger parser and store parsed data
    exec(
      `python "${jobScriptPath}" "${jobCreate._id}"`,
      async (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing script:", error);
          return res.status(201).json({
            message: "Job created, but parsing failed.",
            jobCreate,
            success: true,
          });
        }

        try {
          const parsedData = JSON.parse(stdout);
          await ParsedJob.create({
            jobId: jobCreate._id,
            parsed_tags: parsedData.tags,
            parsed_skills: parsedData.skills_required,
            parsed_description: parsedData.description,
            parsed_company: parsedData.company,
            parsed_title: parsedData.title,
            parsed_location: parsedData.location,
            parsed_jobType: parsedData.jobType,
          });

          await Job.findByIdAndUpdate(jobCreate._id, { parsed: true });

          const updatedJob = await Job.findById(jobCreate._id);
          res.status(200).json({
            message: "New Job Created and Parsed Successfully",
            jobCreate: updatedJob,
            success: true,
          });
        } catch (e) {
          console.error("Failed to save parsed data:", e);
          res.status(201).json({
            message: "Job created, but saving parsed data failed.",
            jobCreate,
            success: true,
          });
        }
      }
    );
  } catch (error) {
    console.error("Post Job Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Admin: Get jobs posted by the admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate("company");

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No job posts found", success: false });
    }

    for (const job of jobs) {
      const alreadyParsed = await ParsedJob.findOne({ jobId: job._id });
      if (!job.parsed && !alreadyParsed) {
        exec(
          `python "${jobScriptPath}" "${job._id}"`,
          async (err, stdout, stderr) => {
            if (err || stderr) {
              console.error(`Error parsing job ${job._id}:`, err || stderr);
              return;
            }

            try {
              const parsedData = JSON.parse(stdout);
              await ParsedJob.create({
                jobId: job._id,
                parsed_tags: parsedData.tags,
                parsed_skills: parsedData.skills_required,
                parsed_description: parsedData.description,
                parsed_company: parsedData.company,
                parsed_title: parsedData.title,
                parsed_location: parsedData.location,
                parsed_jobType: parsedData.jobType,
              });

              await Job.findByIdAndUpdate(job._id, { parsed: true });
              console.log(`Parsed data for job ${job._id} saved.`);
            } catch (e) {
              console.error(`Failed to parse job ${job._id}:`, e);
            }
          }
        );
      }
    }

    const parsedJobs = await ParsedJob.find({
      jobId: { $in: jobs.map((job) => job._id) },
    });

    return res.status(200).json({
      jobs,
      parsedJobs,
      success: true,
    });
  } catch (error) {
    console.error("The error in getAdminJobs is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Students: Get all available jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No job posts found", success: false });
    }

    for (const job of jobs) {
      const alreadyParsed = await ParsedJob.findOne({ jobId: job._id });
      if (!job.parsed && !alreadyParsed) {
        exec(
          `python "${jobScriptPath}" "${job._id}"`,
          async (err, stdout, stderr) => {
            if (err || stderr) {
              console.error(`Error parsing job ${job._id}:`, err || stderr);
              return;
            }

            try {
              const parsedData = JSON.parse(stdout);
              await ParsedJob.create({
                jobId: job._id,
                parsed_tags: parsedData.tags,
                parsed_skills: parsedData.skills_required,
                parsed_description: parsedData.description,
                parsed_company: parsedData.company,
                parsed_title: parsedData.title,
                parsed_location: parsedData.location,
                parsed_jobType: parsedData.jobType,
              });

              await Job.findByIdAndUpdate(job._id, { parsed: true });
              console.log(`Parsed data for job ${job._id} saved.`);
            } catch (e) {
              console.error(`Failed to parse job ${job._id}:`, e);
            }
          }
        );
      }
    }

    const parsedJobs = await ParsedJob.find({
      jobId: { $in: jobs.map((job) => job._id) },
    });

    return res.status(200).json({
      jobs,
      parsedJobs,
      success: true,
    });
  } catch (error) {
    console.error("Get All Jobs Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getBookmarkedJobs = async (req, res) => {
  try {
    const userID = req.user.id; // req.user.id must be set by your auth middleware

    const bookmarks = await Bookmark.find({ user: userID })
      .populate({
        path: "job",
        populate: { path: "company" }, // optional: if you want company data inside job
      })
      .sort({ createdAt: -1 });

    // Extract only the job objects from the bookmarks
    const jobs = bookmarks.map((b) => b.job);

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookmarked jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("The error in getBookmarkedJobs controller is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// Get a specific job by ID
export const getJobsById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
    });

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

// Update an existing company's details
export const updateJobPost = async (req, res) => {
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
    } = req.body;

    // Prepare update data
    const updateData = {
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
    };

    // Update the company details
    const jobPost = await Job.findByIdAndUpdate(
      req.params.id,
      updateData
    ).populate({
      path: "company",
    });

    if (!jobPost) {
      return res.status(404).json({
        message: "Job post not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job Post data updated successfully",
      jobPost,
      success: true,
    });
  } catch (error) {
    console.error("The error in updateJobPost is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// delete existing company
export const deleteJobPost = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the company exists
    const jobPost = await Job.findById(id);

    if (!jobPost) {
      return res
        .status(404)
        .json({ success: false, message: "Job Post not found." });
    }

    // Delete the job post
    await jobPost.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Job Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting Job Post:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete Job Post. Please try again later.",
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const newJobData = req.body;

    const job = await Job.create(newJobData);

    // ✅ Trigger the Python job parser
    exec(
      `python3 job_parser/job_parser.py ${job._id}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error running job parser:", error);
          return;
        }
        console.log("Job parsed successfully:", stdout);
      }
    );

    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error("Job creation failed:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
