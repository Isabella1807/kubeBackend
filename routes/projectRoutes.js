import express from "express";
import {projectController} from "../controllers/projectController.js";


const router = express.Router();
router.get("/", projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", projectController.create)
router.delete("/:id", projectController.delete)
export default router;