import mongoose from "mongoose";

const parsedJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    parsed_tags: [String],
    parsed_skills: [String],
    parsed_description: String,
    parsed_company: String,
    parsed_title: String,
    parsed_location: String,
    parsed_jobType: String,
  },
  { timestamps: true }
);

export const ParsedJob = mongoose.model("ParsedJob", parsedJobSchema);
