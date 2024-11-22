import express from "express";
import { addUser, getUserById, getAllUsers, updatePassword, deleteUserByIdController } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post("/", addUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.put("/:id/password", updatePassword);
userRouter.delete("/:id", deleteUserByIdController);  

export default userRouter;