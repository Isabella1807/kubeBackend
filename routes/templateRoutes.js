import express from "express";
import { templateController } from "../controllers/templateController.js";
import {mustBeLoggedIn, mustBeAdmin} from "../middleware/authenticate.js";

const router = express.Router();
router.get("/", mustBeLoggedIn, templateController.getAll);  // Brug getAll metoden
router.get("/:id", mustBeLoggedIn, mustBeAdmin, templateController.getByID);  // Brug getByID metoden
router.post("/", mustBeLoggedIn, mustBeAdmin, templateController.create);  // Brug create metoden
router.delete("/:id", mustBeLoggedIn, mustBeAdmin, templateController.delete); // Brug delete metoden
router.put("/:id", mustBeLoggedIn, mustBeAdmin, templateController.update);  // PUT rute til at opdatere template
export default router;