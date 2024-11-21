import express from "express";
import { addUser, getUserById, getAllUsers, updatePassword } from "../controllers/userController.js";

const userRouter = express.Router();

// Route to create a user
userRouter.post("/", addUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", getAllUsers);
userRouter.put("/:id/password", updatePassword);

export default userRouter;
