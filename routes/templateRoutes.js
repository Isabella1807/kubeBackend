import express from "express";
import { showAllTemplate } from "../controllers/templateController.js";




const router = express.Router();
router.get("/", showAllTemplate.getAll);  // Brug getAll metoden
router.get("/:id", showAllTemplate.getByID);  // Brug getByID metoden
router.post("/", showAllTemplate.create);  // Brug create metoden
router.delete("/:id", showAllTemplate.delete);  // Brug delete metoden
export default router;