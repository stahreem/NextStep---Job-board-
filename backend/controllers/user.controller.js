import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    console.log("Error in register controller ");
  }
};

export const login = async (req, res) => {
  try {
    // fetch data
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Fill all the credential ",
        success: false,
      });
    }
    // check if user exist or not
    let user = await User.findOne({ email });
    // if user not existed return
    if (!user) {
      return res.status(400).json({
        message: "User does not existed  ",
        success: false,
      });
    }
    // check hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password does not match   ",
        success: false,
      });
    }

    // check if role is correct or not
    if (role === !user.role) {
      return res.status(400).json({
        message: " Account does not exist with current role ",
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
      profile: user.profile,
      token,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullName} `,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Error in login controller ", error);
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
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const skillArray = skills ? skills.split(",") : [];

    const userId = req.id;

    let user = await User.findByIdAndUpdate(
      userId,
      { fullName, email, phoneNumber, bio, skills: skillArray },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("error in update controller is:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
