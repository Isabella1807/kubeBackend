import express from "express";
import { showAllTemplate } from "../controllers/templateController.js";

const router = express.Router();
router.get("/", showAllTemplate.getAll);
router.get("/:id", showAllTemplate.getByID);
router.post("/", showAllTemplate.create);
router.put("/:id", showAllTemplate.update);  // Update-rute
router.delete("/:id", showAllTemplate.delete);  // Delete-rute
export default router;