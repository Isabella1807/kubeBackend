import express from "express";
import { addUser, getUserById, getAllUsers } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post("/", addUser);
userRouter.get("/:id", getUserById); 
userRouter.get("/", getAllUsers);


export default userRouter;
