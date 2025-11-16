import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("TOKEN FOUND:", token);

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secretkey");

    console.log("DECODED:", decoded);

    req.user = await User.findById(decoded.id);

    console.log("FOUND USER:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not found for token" });
    }

    next();
  } catch (err) {
    console.log("VERIFY TOKEN ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

