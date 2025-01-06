import express from "express";
import { teamController } from "../controllers/teamController.ts";
import {mustBeFaculty} from "../middleware/authenticate.ts";

const router = express.Router();
router.get("/", mustBeFaculty, teamController.getAll);
router.get("/:id", mustBeFaculty, teamController.getByID);
router.post("/", mustBeFaculty, teamController.create);
router.delete("/:id", mustBeFaculty, teamController.delete);
export default router;