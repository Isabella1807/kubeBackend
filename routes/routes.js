import express from "express";
import {showAllRoles} from "../controllers/roleController.js";

const router = express.Router();
router.get("/roles", showAllRoles);
export default router;