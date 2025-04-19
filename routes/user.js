import express from "express";
const router = express.Router();

import checkAuth from "../middleware/checkAuth.js";

import {
  getUserProfile,
  updateUserProfile,
  updateUserLinks,
} from "../controllers/userController.js";

router.get("/", checkAuth, getUserProfile);

router.put("/update", checkAuth, updateUserProfile);

router.put("/links", checkAuth, updateUserLinks);

export default router;
