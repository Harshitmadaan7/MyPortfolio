import express from "express";

import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from "../controllers/contactController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllContacts);
router.get("/:id", getContactById);

// ADMIN ONLY ROUTES
router.post("/", verifyToken, isAdmin, addContact);
router.put("/:id", verifyToken, isAdmin, updateContact);
router.delete("/:id", verifyToken, isAdmin, deleteContact);

// OPTIONAL — delete all contacts
router.delete("/", verifyToken, isAdmin, deleteAllContacts);

export default router;
