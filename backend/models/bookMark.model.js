import mongoose from "mongoose";

const bookMarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// To prevent duplicate bookmarks
bookMarkSchema.index({ user: 1, job: 1 }, { unique: true });

export const Bookmark = mongoose.model("Bookmark", bookMarkSchema);
