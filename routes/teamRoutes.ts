import express from "express";
import { teamController } from "../controllers/teamController";
import {mustBeFaculty} from "../middleware/authenticate";

const router = express.Router();
router.get("/", mustBeFaculty, teamController.getAll);
router.get("/:id", mustBeFaculty, teamController.getByID);
router.post("/", mustBeFaculty, teamController.create);
router.delete("/:id", mustBeFaculty, teamController.delete);
export default router;