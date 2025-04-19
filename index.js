import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, X-Requested-With, Content-Type, Authorization"
  );
  next();
});

// Check for Missing Body Middleware
app.use((req, res, next) => {
  const hasBody =
    req.method === "POST" || req.method === "PUT" || req.method === "PATCH";

  if (hasBody && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).json({
      success: false,
      message: "Missing or empty request body",
    });
  }

  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Dev Links API!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Global Error Handler
app.use(errorHandler);

// Catch-all for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
