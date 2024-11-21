import express from "express";
import { addUser, getUserById } from "../controllers/userController.js";

const userRouter = express.Router();

// Route to create a user
userRouter.post("/", addUser);
userRouter.get("/:id", getUserById);

export default userRouter;
