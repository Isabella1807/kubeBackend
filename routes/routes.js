import express from "express";
import {showAllRoles} from "../controllers/roleController.js";
import {showAllTemplate} from "../controllers/templateController.js";

import projectRoutes from "./projetesRoutes.js";

const router = express.Router();
router.get("/roles", showAllRoles);
router.get("/template", showAllTemplate.getAll);  // Brug getAll metoden
router.use("/projects", projectRoutes);

router.use((req, res) => {res.status(404).send("route not found")})

export default router;
