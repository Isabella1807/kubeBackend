import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authenticate.js";

const router = express.Router();
router.get("/", mustBeLoggedIn, projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", mustBeLoggedIn, projectController.create)
router.delete("/:id", mustBeLoggedIn, projectController.delete)
export default router;
