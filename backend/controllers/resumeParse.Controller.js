import { spawn } from "child_process";
import path from "path";
import { User } from "../models/user.model.js";

export const parseResume = async (req, res) => {
  try {
    const userId = req.id; // comes from auth middleware

    const user = await User.findById(userId);
    if (!user || !user.studentDetails?.resumeLink) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found for user." });
    }

    const resumeUrl = user.studentDetails.resumeLink;
    const pythonScriptPath = path.resolve("resume_parser/resume_parser.py");

    const python = spawn("python3", [pythonScriptPath, resumeUrl]);

    let dataToSend = "";
    let errorData = "";

    python.stdout.on("data", (data) => {
      dataToSend += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0 || errorData) {
        console.error("Python script error:", errorData);
        return res.status(500).json({ success: false, error: errorData });
      }

      try {
        const parsedJSON = JSON.parse(dataToSend);
        return res.status(200).json({ success: true, data: parsedJSON });
      } catch (err) {
        console.error("JSON parse error:", err);
        return res
          .status(500)
          .json({ success: false, error: "Failed to parse resume data" });
      }
    });
  } catch (error) {
    console.error("Resume parse controller error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
