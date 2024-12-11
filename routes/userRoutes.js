import express from 'express';
import multer from 'multer';
import {mustBeLoggedIn, mustBeAdmin, mustBeFaculty} from "../middleware/authenticate.js";
import { addUserFromCSV, getUserById, getAllUsers, updatePassword, deleteUserByIdController,  getTeamMembers, createSingleUser } from '../controllers/userController.js';


    // save files in multer memory
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    const userRouter = express.Router();

// the route for csv upload and add users
userRouter.post('/upload', mustBeLoggedIn, mustBeAdmin, mustBeFaculty, upload.single('file'), addUserFromCSV);

// route to get user by ID
userRouter.get('/:id', mustBeLoggedIn, mustBeAdmin, mustBeFaculty, getUserById);

// route to get all users
userRouter.get('/', mustBeLoggedIn, mustBeAdmin, mustBeFaculty ,getAllUsers);

// route to update users password
userRouter.put('/:id/password', mustBeLoggedIn, mustBeAdmin, mustBeFaculty,  updatePassword);

// rote for deleting the user by their id 
userRouter.delete('/:id', mustBeLoggedIn, mustBeAdmin, mustBeFaculty, deleteUserByIdController);

// the route for creating a single user in edit group
    userRouter.post('/new', createSingleUser);

// route to get team members
    userRouter.get('/team/:teamId/members', getTeamMembers);


 // route to update users password
    userRouter.put('/:id/password', updatePassword);

 // rote for deleting the user by their id
    userRouter.delete('/:id', deleteUserByIdController);

    export default userRouter;
