import express from "express";
const router = express.Router();

import checkAuth from "../middleware/checkAuth.js";

import {
  getUserProfile,
  updateUserProfile,
  updateUserLinks,
  getUserLinks,
  getUserById,
  getUserByUsername,
} from "../controllers/userController.js";

router.get("/", checkAuth, getUserProfile);

router.get("/:id", getUserById);

router.get("/:username", getUserByUsername);

router.put("/update", checkAuth, updateUserProfile);

router.get("/links", checkAuth, getUserLinks);

router.put("/links", checkAuth, updateUserLinks);

export default router;
