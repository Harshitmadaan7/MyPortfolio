import express from "express";

import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC — VIEW ONLY
router.get("/", getServices);

// ADMIN — CRUD
router.post("/", verifyToken, isAdmin, addService);
router.put("/:id", verifyToken, isAdmin, updateService);
router.delete("/:id", verifyToken, isAdmin, deleteService);

export default router;
