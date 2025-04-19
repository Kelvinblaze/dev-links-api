import express from "express";
const router = express.Router();

import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "../controllers/authController.js";

router.post("/login", Login);

router.post("/register", Register);

router.post("/forgot-password", ForgotPassword);

router.post("/reset-password", ResetPassword);

export default router;
