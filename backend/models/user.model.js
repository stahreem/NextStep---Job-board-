import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    studentDetails: {
      graduationStatus: { type: String },
      github: { type: String },
      linkedin: { type: String },
      about: { type: String },
      education: [
        {
          degree: { type: String },
          institution: { type: String },
          year: { type: String }, // Using string for consistency
        },
      ],
      experience: [
        {
          role: { type: String },
          company: { type: String },
          year: { type: String },
        },
      ],
      skills: [{ type: String }],
      projects: [
        {
          name: { type: String },
          description: { type: String },
          link: { type: String },
        },
      ],
      interests: [{ type: String }],
      resumeLink: { type: String },

    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
