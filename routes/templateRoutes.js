import express from "express";
import {templateController} from "../controllers/templateController.js";


const router = express.Router();
router.get("/", templateController.getAll)
router.get("/:id", templateController.getByID)
router.post("/", templateController.create)
router.delete("/:id", templateController.delete)
export default router;