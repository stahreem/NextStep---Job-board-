import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        default: "",
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["fresher", "intermediate", "senior", "superSenior"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["onSite", "remote"],
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    parsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
