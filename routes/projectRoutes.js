import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authToken.js";

const router = express.Router();
router.get("/", mustBeLoggedIn, projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/", projectController.create)
router.delete("/:id", projectController.delete)
export default router;