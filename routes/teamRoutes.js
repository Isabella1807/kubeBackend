import express from "express";
import { teamController } from "../controllers/teamController.js";

const router = express.Router();
router.get("/", teamController.getAll);
router.get("/:id", teamController.getByID);
router.post("/", teamController.create);
router.delete("/:id", teamController.delete);
export default router;