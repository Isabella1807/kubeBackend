import express from "express";
import { templateController } from "../controllers/templateController.js";

const router = express.Router();
router.get("/", templateController.getAll);  // Brug getAll metoden
router.get("/:id", templateController.getByID);  // Brug getByID metoden
router.post("/", templateController.create);  // Brug create metoden
router.delete("/:id", templateController.delete);  // Brug delete metoden
export default router;