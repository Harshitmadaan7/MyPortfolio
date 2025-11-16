import express from "express";

import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from "../controllers/projectController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getProjects);
router.get("/:id", getProjectById);

// ADMIN ONLY CRUD
router.post("/", verifyToken, isAdmin, addProject);
router.put("/:id", verifyToken, isAdmin, updateProject);
router.delete("/:id", verifyToken, isAdmin, deleteProject);

// OPTIONAL: delete all projects
router.delete("/", verifyToken, isAdmin, deleteAllProjects);

export default router;
