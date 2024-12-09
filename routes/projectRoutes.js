import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authenticate.js";
import {requirePortainerAuth} from "../middleware/portainerConnection.js";

const router = express.Router();
router.get("/", mustBeLoggedIn, requirePortainerAuth, projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", mustBeLoggedIn, requirePortainerAuth, projectController.create)
router.delete("/:id", mustBeLoggedIn, requirePortainerAuth, projectController.delete)
export default router;
