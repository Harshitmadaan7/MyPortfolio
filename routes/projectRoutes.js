import express from "express";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.delete("/", deleteAllProjects);

export default router;
