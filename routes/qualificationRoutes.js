import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

import {
  getQualifications,
  getQualificationById,
  addQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualificationController.js";

const router = express.Router();

router.get("/", getQualifications);
router.get("/:id", getQualificationById);
router.post("/", addQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualification);
router.delete("/", deleteAllQualifications);

export default router;
