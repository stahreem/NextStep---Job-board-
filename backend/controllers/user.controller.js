import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Fill all the credential ",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already with this email ",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // new user

    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully ",
      success: true,
    });
  } catch (error) {
    console.log("Error in register controller ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    // fetch data
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Fill all the credentials",
        success: false,
      });
    }
    // check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    // check hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password does not match",
        success: false,
      });
    }

    // check if role matches
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      studentDetails: user.studentDetails,
      token,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Error in login controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logout  successfully ",
      success: true,
    });
  } catch (error) {
    console.log("the error in logout error ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      graduationStatus,
      github,
      linkedin,
      about,
      education,
      experience,
      skills,
      projects,
      interests,
    } = req.body;

    const file = req.file;

    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    let resumeLink;
    let originalResumeName;

    if (file) {
      originalResumeName = file.originalname;
      const fileUri = getDataUri(file);

      const isPDF = file.mimetype === "application/pdf";

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: isPDF ? "raw" : "auto", // ⬅️ Key change
        folder: "resumes", // optional for better organization
        public_id: originalResumeName.split(".")[0], // optional
      });

      resumeLink = cloudResponse.secure_url;
      console.log("MIME Type:", file.mimetype);
      console.log("cloudResponse:", cloudResponse);
      // console.log("MIME Type:", file.mimetype);
    }

    if (user.role === "student") {
      user.studentDetails = {
        ...user.studentDetails,
        ...(graduationStatus && { graduationStatus }),
        ...(github && { github }),
        ...(linkedin && { linkedin }),
        ...(about && { about }),
        ...(education && { education }),
        ...(experience && { experience }),
        ...(skills && { skills }),
        ...(projects && { projects }),
        ...(interests && { interests }),
        ...(resumeLink && { resumeLink }),
        ...(originalResumeName && { resumeName: originalResumeName }), // Save the original file name
      };
    }
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userID = req.id;
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
        success: false,
      });
    }

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.error("The error in get profile controller is:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
