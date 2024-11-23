import express from "express";
import { addUser, getUserById, getAllUsers, updateUserPassword, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", addUser);
userRouter.get("/:id", getUserById); 
userRouter.get("/", getAllUsers);
userRouter.put("/:id/password", updateUserPassword);
userRouter.delete("/:id", deleteUser);

export default userRouter;
