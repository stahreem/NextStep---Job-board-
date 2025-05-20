import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Get current module path (for ES6)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRecommendations = (req, res) => {
  const userId = req.id;
  // console.log("✅ Authenticated User ID:", userId);

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

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error("❌ Python script exited with code", code);
      console.error("stderr:", errorOutput);
      return res.status(500).json({ error: "Recommendation engine failed." });
    }

    try {
      const recommendations = JSON.parse(result);
      return res.status(200).json({ recommendations });
    } catch (err) {
      console.error("❌ Failed to parse Python output:", result);
      return res
        .status(500)
        .json({ error: "Failed to parse recommendations." });
    }
  });
};
