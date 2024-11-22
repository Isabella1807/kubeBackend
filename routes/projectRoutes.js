import express from "express";
import { showAllTemplate } from "../controllers/templateController.js";

const router = express.Router();
router.get("/", projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", projectController.create)
router.delete("/:id", projectController.delete)
export default router;