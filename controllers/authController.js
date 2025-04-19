import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Importing the User model
import User from "../models/User.js";

// Login user
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res
      .status(200)
      .json({
        success: true,
        data: { token, user },
        message: "Login successfully",
      });
  } catch (error) {
    next(error);
  }
};

const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check for existing user by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Return response
    res.status(201).json({
      success: true,
      message: "Account has been successfully created.",
    });
  } catch (error) {
    next(error);
  }
};

const ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email });
    if (!user.length) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Here you would typically send a password reset email
    res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.find({ email });
    if (!user.length) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export { Login, Register, ForgotPassword, ResetPassword };
