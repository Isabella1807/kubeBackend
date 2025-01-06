import express from "express";
import {projectController} from "../controllers/projectController";
import {mustBeLoggedIn} from "../middleware/authenticate";
import {requirePortainerAuth} from "../middleware/portainerConnection";
//import {STOP_REQUEST} from "../middleware/temp.ts";

const router = express.Router();

router.get("/", mustBeLoggedIn, requirePortainerAuth, projectController.getAll)
// router.get("/:id", projectController.getByID)
router.post("/", mustBeLoggedIn, requirePortainerAuth, projectController.create)
router.delete("/:id", mustBeLoggedIn, requirePortainerAuth, projectController.delete)
router.post("/start/:id", mustBeLoggedIn, requirePortainerAuth, projectController.startProject)
router.post("/stop/:id", mustBeLoggedIn, requirePortainerAuth, projectController.stopProject)
router.post("/restart/:id", mustBeLoggedIn, requirePortainerAuth, projectController.restartProject)
export default router;
