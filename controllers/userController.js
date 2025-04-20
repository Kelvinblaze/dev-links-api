import User from "../models/User.js";

// Get user profile
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({
      success: true,
      data: user,
      message: "Successfully fetched user profile",
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        photo: user.photo,
        links: user.links,
      },
      message: "Successfully fetched user profile",
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, photo } = req.body;

    if (!firstName || !lastName || !username || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: req.user },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          existingUser.email === email
            ? "User with this email already exists"
            : "Username already exists",
      });
    }

    const updatedFields = {
      firstName,
      lastName,
      username,
      email,
      photo,
    };

    const user = await User.findByIdAndUpdate(req.user, updatedFields, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: user,
      message: "Successfully updated profile",
    });
  } catch (error) {
    next(error);
  }
};

// Get User Links
const getUserLinks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user.links,
      message: "Successfully fetched user links",
    });
  } catch (error) {
    next(error);
  }
};

// Update user links
const updateUserLinks = async (req, res, next) => {
  try {
    const { links } = req.body;

    if (!links || !Array.isArray(links)) {
      return res.status(400).json({
        success: false,
        message: "Links must be an array",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user,
      { links },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: user,
      message: "Successfully updated links",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getUserProfile,
  updateUserProfile,
  updateUserLinks,
  getUserLinks,
  getUserById,
};
