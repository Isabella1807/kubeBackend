import express from 'express';
import multer from 'multer';
import { mustBeLoggedIn, mustBeFaculty } from "../middleware/authenticate.js";
import {
    addUserFromCSV,
    getUserById,
    getAllUsers,
    updatePassword,
    deleteUserByIdController,
    getTeamMembers,
    createSingleUser
} from '../controllers/userController.js';

// save files in multer memory
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const userRouter = express.Router();

// the route for csv upload and add users
userRouter.post('/upload', mustBeLoggedIn, mustBeFaculty, upload.single('file'), addUserFromCSV);

// route to get user by ID
//userRouter.get('/:id', mustBeLoggedIn, mustBeFaculty, getUserById);

// route to get all users
//userRouter.get('/', mustBeLoggedIn, mustBeFaculty, getAllUsers);

//TODO: *** I AM HERE ***

// route to update users password
userRouter.put('/:id/password', mustBeLoggedIn, mustBeFaculty, updatePassword);

// rote for deleting the user by their id 
userRouter.delete('/:id', mustBeLoggedIn, mustBeFaculty, deleteUserByIdController);

// the route for creating a single user in edit group
userRouter.post('/new', mustBeFaculty, createSingleUser);

// route to get team members
userRouter.get('/team/:teamId/members', getTeamMembers);

// route for deleting the user by their id
userRouter.delete('/:id', mustBeFaculty, deleteUserByIdController);

export default userRouter;
