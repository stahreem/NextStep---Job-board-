import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { EventEmitter } from "events";

dotenv.config({});
const app = express();

// Increase max listeners if necessary
EventEmitter.defaultMaxListeners = 20;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true,
};
app.use(cors(corsOptions));

// routes
import userRoute from "./routes/user.Routes.js";
app.use("/api/v1/auth", userRoute);

import companyRoutes from "./routes/company.Routes.js";
app.use("/api/v1/company", companyRoutes);

import jobRoutes from "./routes/job.Routes.js";
app.use("/api/v1/job", jobRoutes);

import applicationRoutes from "./routes/application.Routes.js";
app.use("/api/v1/applications", applicationRoutes);

import bookMarkRoutes from "./routes/bookMark.Routes.js";
app.use("/api/v1/bookmark", bookMarkRoutes);

import recommendationsRoutes from "./routes/recommendations.Routes.js";
app.use("/api/v1/recommendations", recommendationsRoutes); // Fix: Added leading slash

import resumeRoutes from "./routes/resume.Routes.js";
app.use("/api/v1/resume", resumeRoutes);

// database and port
import connectDB from "./database/connectDB.js";

const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
