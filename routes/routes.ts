import express from "express";
import { showAllRoles } from "../controllers/roleController";

import projectRoutes from "./projectRoutes";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import templateRoutes from "./templateRoutes";
import teamRoutes from "./teamRoutes";

const router = express.Router();

router.use("/roles", showAllRoles);
router.use("/templates", templateRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/login", loginRoutes);
router.use((req, res) => { res.status(404).send("route not found") })

export default router;