import express from "express";
import { addUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Route to create a user
userRouter.post("/", addUser);

export default userRouter;
