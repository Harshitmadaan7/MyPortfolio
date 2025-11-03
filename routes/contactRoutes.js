import express from "express";
import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.delete("/", deleteAllContacts);

export default router;
