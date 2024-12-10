import express from 'express';
import multer from 'multer';
import {mustBeLoggedIn, mustBeAdmin} from "../middleware/authenticate.js";
import { addUserFromCSV, getUserById, getAllUsers, updatePassword, deleteUserByIdController } from '../controllers/userController.js';

// save files in multer memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRouter = express.Router();

// the route for csv upload and add users
userRouter.post('/upload', mustBeLoggedIn, mustBeAdmin, upload.single('file'), addUserFromCSV);

// route to get user by ID
userRouter.get('/:id', mustBeLoggedIn, mustBeAdmin, getUserById);

// route to get all users
userRouter.get('/', mustBeLoggedIn, mustBeAdmin ,getAllUsers);

// route to update users password
userRouter.put('/:id/password', mustBeLoggedIn, mustBeAdmin, updatePassword);

// rote for deleting the user by their id 
userRouter.delete('/:id', mustBeLoggedIn, mustBeAdmin, deleteUserByIdController);

export default userRouter;
