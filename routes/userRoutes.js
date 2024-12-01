import express from 'express';
import multer from 'multer';
import { addUserFromCSV, getUserById, getAllUsers, updatePassword, deleteUserByIdController } from '../controllers/userController.js';

// Set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRouter = express.Router();

// Route for uploading CSV and adding users
userRouter.post('/upload', upload.single('file'), addUserFromCSV);

// Route for fetching a user by ID
userRouter.get('/:id', getUserById);

// Route for fetching all users
userRouter.get('/', getAllUsers);

// Route for updating a user's password by ID
userRouter.put('/:id/password', updatePassword);

// Route for deleting a user by ID
userRouter.delete('/:id', deleteUserByIdController);

export default userRouter;
