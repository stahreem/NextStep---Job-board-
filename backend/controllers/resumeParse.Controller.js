import { spawn } from "child_process";
import path from "path";
import { User } from "../models/user.model.js";
import { MongoClient } from "mongodb";

const MONGO_URI =
  "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(MONGO_URI);

export const parseResume = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user || !user.studentDetails?.resumeLink) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found for user." });
    }

    const resumeUrl = user.studentDetails.resumeLink;
    const pythonScriptPath = path.resolve("resume-parser/resume_parser.py");

    const python = spawn("python", [pythonScriptPath, resumeUrl, userId]);

    let errorData = "";

    python.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    python.on("close", async (code) => {
      if (code !== 0 || errorData) {
        console.error("Python script error:", errorData);
        return res.status(500).json({ success: false, error: errorData });
      }

      try {
        // Connect to MongoDB and fetch parsed resume
        await client.connect();
        const db = client.db("test"); // Replace with your DB name
        const collection = db.collection("parsed_resumes");

        const parsedResume = await collection.findOne({ user: userId });

        if (!parsedResume) {
          return res
            .status(404)
            .json({ success: false, message: "Parsed resume not found." });
        }

        return res.status(200).json({
          success: true,
          message: "Resume parsed and saved successfully.",
          data: parsedResume,
        });
      } catch (err) {
        console.error("DB fetch error:", err);
        return res
          .status(500)
          .json({ success: false, error: "Failed to fetch parsed resume." });
      } finally {
        await client.close();
      }
    });
  } catch (error) {
    console.error("Resume parse controller error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
