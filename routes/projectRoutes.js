import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authenticate.js";
import {requirePortainerAuth} from "../middleware/portainerConnection.js";

const router = express.Router();
router.get("/", mustBeLoggedIn, projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", mustBeLoggedIn, requirePortainerAuth, projectController.create)
router.delete("/:id", mustBeLoggedIn, requirePortainerAuth, projectController.delete)
router.post("/start/:id", projectController.startProject)
router.post("/stop/:id", projectController.stopProject)
router.post("/restart/:id", projectController.restartProject)
export default router;
