import express from "express";
import { login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", login);
router.post("/signout", logout);

export default router;
