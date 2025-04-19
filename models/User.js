import mongoose from "mongoose";
import LinkSchema from "./Link.js";
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      default: function () {
        return `user_${Date.now()}`; // Generate a unique default value
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo: { type: String, default: "" },
    password: { type: String, required: true },
    links: [LinkSchema],
    settings: {
      theme: { type: String, default: "light" },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);

export default User;
