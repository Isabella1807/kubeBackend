import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authenticate.js";

//HUsk at sætte mustbeloggein på nr.1

const router = express.Router();
router.get("/",  projectController.getAll)
router.get("/:id", projectController.getByID)
router.post("/post", projectController.create)
router.delete("/:id", projectController.delete)
export default router;
