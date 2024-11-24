import express from "express";
import {showAllRoles} from "../controllers/roleController.js";
// import projectRoutes from "./projectRoutes.js";
import userRoutes from "./userRoutes.js";
import templateRoutes from "./templateRoutes.js";

const router = express.Router();
router.get("/roles", showAllRoles);
router.get("/template", templateRoutes);
// router.use("/projects", projectRoutes);
router.use("/users", userRoutes);

router.use((req, res) => {res.status(404).send("route not found")})

export default router;
