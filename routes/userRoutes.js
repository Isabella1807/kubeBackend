import express from "express";
import { addUser, getUserById } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post("/", addUser);
userRouter.get("/:id", getUserById); 


export default userRouter;
