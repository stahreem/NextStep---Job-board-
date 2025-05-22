import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { Job } from "../models/job.model.js"; // Adjust path if necessary

// Get current module path (for ES6)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===================== 🔁 SVD-BASED RECOMMENDATIONS =====================
export const getRecommendations = async (req, res) => {
  const userId = req.id;
  console.log("✅ Authenticated User ID:", userId);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User ID not found" });
  }

  const pythonPath = "python";
  const scriptPath = path.join(__dirname, "../svd/svd_recomm.py");

  const pythonProcess = spawn(pythonPath, [scriptPath, userId]);

  let result = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on("close", async (code) => {
    if (code !== 0) {
      console.error("❌ Python script exited with code", code);
      console.error("stderr:", errorOutput);
      return res.status(500).json({ error: "Recommendation engine failed." });
    }

    try {
      const recommendedJobIds = JSON.parse(result); // job IDs only
      const jobs = await Job.find({ _id: { $in: recommendedJobIds } }).populate(
        "company"
      );

      return res.status(200).json({ recommendations: jobs });
    } catch (err) {
      console.error("❌ Failed to process job recommendations:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch recommended job details." });
    }
  });
};

// ===================== 📄 TF-IDF COSINE-BASED RECOMMENDATIONS =====================
export const recommendJobs = async (req, res) => {
  try {
    const userId = req.id;

    const scriptPath = path.resolve("recommend_jobs/recommend_jobs.py");
    const python = spawn("python", [scriptPath, userId]);

    let result = "";
    let errorData = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    python.on("close", async (code) => {
      if (code !== 0 || errorData) {
        console.error("Python script error:", errorData || `Exit code ${code}`);
        return res.status(500).json({
          success: false,
          error: "Error occurred while running the recommendation script.",
          details: errorData,
        });
      }

      try {
        const parsedResult = JSON.parse(result.trim());

        if (!parsedResult.success) {
          return res.status(404).json({
            success: false,
            error: parsedResult.error || "No recommendations found.",
          });
        }

        const recommendedJobIds = parsedResult.recommendations.map(
          (rec) => rec.jobId
        );

        if (
          !Array.isArray(recommendedJobIds) ||
          recommendedJobIds.length === 0
        ) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No job recommendations found.",
          });
        }

        const jobs = await Job.find({
          _id: { $in: recommendedJobIds },
        }).populate("company");

        return res.status(200).json({
          success: true,
          data: jobs,
        });
      } catch (err) {
        console.error("Failed to parse or fetch job recommendations:", err);
        return res.status(500).json({
          success: false,
          error: "Failed to parse or fetch job recommendations.",
        });
      }
    });
  } catch (err) {
    console.error("Unexpected server error:", err);
    return res.status(500).json({
      success: false,
      error: "Unexpected server error while recommending jobs.",
    });
  }
};

// ===================== 🔁 FIT SCORE FROM PYTHON SCRIPT =====================
export const getFitScore = async (req, res) => {
  const { userId, jobId } = req.params; // ✅ Now pulled from URL params

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  const pythonPath = "python"; // or "python3"
  const scriptPath = path.join(__dirname, "../ml_algorithms/fit_score.py");

  const pythonProcess = spawn(pythonPath, [scriptPath, userId, jobId]);

  let result = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  pythonProcess.on("close", async (code) => {
    if (code !== 0) {
      console.error("❌ Python script exited with code", code);
      console.error("stderr:", errorOutput);
      return res.status(500).json({ error: "Fit score calculation failed." });
    }

    try {
      const recommendedScore = JSON.parse(result); // Make sure Python returns valid JSON
      console.log("✅ Fit Score:", recommendedScore.fit_score);

      return res.status(200).json({
        success: true,
        userId,
        jobId,
        recommendedScore,
      });
    } catch (err) {
      console.error("❌ Failed to parse fit score result:", err);
      return res
        .status(500)
        .json({ error: "Failed to parse fit score result." });
    }
  });
};
