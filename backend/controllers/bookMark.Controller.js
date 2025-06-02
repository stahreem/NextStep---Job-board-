import { Bookmark } from "../models/bookMark.model.js";

export const addBookMark = async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  try {
    const existing = await Bookmark.findOne({ user: userId, job: jobId });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Job Post already bookmarked" });
    }

    const bookmark = await Bookmark.create({ user: userId, job: jobId });

    return res
      .status(201)
      .json({ success: true, message: "Job bookmarked", bookmark });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to bookmark the job",
    });
  }
};

export const removeBookmark = async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  try {
    const bookmark = await Bookmark.findOne({ user: userId, job: jobId });

    if (!bookmark) {
      return res
        .status(404)
        .json({ success: false, message: "Bookmark not found" });
    }

    await Bookmark.deleteOne({ _id: bookmark._id });

    return res.status(200).json({ success: true, message: "Bookmark removed" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove bookmark",
    });
  }
};

export const getBookmarkedJobs = async (req, res) => {
  try {
    const userID = req.id;
    const bookmarks = await Bookmark.find({ user: userID })
      .populate({
        path: "job",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

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

export const getUserBookmarkedJobIds = async (req, res) => {
  try {
    const userID = req.id;

    const bookmarks = await Bookmark.find({ user: userID }).populate({
      path: "job",
      populate: { path: "company" },
    });

    return res.status(200).json({ success: true, bookmarks });
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching bookmarks" });
  }
};
