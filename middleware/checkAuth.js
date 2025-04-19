import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSignature = process.env.JWT_SECRET;

const checkAuth = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).json({
      success: false,
      message: "Bearer Token is required",
    });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, tokenSignature, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }

    // Attach user information to the request object
    req.user = decoded.id; // Ensure `user_id` exists in the token payload
    next();
  });
};

export default checkAuth;
