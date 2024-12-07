import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authenticate.js";

//HUsk at sætte mustBeLoggedIn på nr.1 - Clauida

const router = express.Router();
router.get("/", mustBeLoggedIn, projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/post", projectController.create)
router.delete("/:id", projectController.delete)
export default router;
