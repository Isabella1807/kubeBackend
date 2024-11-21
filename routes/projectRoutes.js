import express from "express";
import {projectController} from "../controllers/projectController.js";

const router = express.Router();
router.get("/", projectController.getAll)
export default router;