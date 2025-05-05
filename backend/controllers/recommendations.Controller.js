import axios from "axios";

export const getRecommendations = async (req, res) => {
  const userId = req.id.toString(); // From your Node auth middleware
  console.log(userId);

  try {
    const flaskResponse = await axios.get(
      "http://127.0.0.1:5000/recommendations",
      {
        headers: {
          user_id: userId, // ✅ This is how Flask expects it
        },
      }
    );

    res.json(flaskResponse.data); // Send it back to frontend
  } catch (error) {
    console.error("Flask error:", error.message);
    res.status(500).json({ error: "Could not get recommendations" });
  }
};
