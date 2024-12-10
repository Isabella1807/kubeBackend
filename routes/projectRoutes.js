import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn, mustBeAdmin} from "../middleware/authenticate.js";
import {requirePortainerAuth} from "../middleware/portainerConnection.js";

//HUsk at sætte mustBeLoggedIn på nr.1 - Clauida

const router = express.Router();
router.get("/", mustBeLoggedIn, mustBeAdmin, requirePortainerAuth, projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", mustBeLoggedIn, requirePortainerAuth, projectController.create)
router.delete("/:id", mustBeLoggedIn, requirePortainerAuth, projectController.delete)

export default router;
