    import express from 'express';
    import multer from 'multer';
    import { addUserFromCSV, getUserById, getAllUsers, updatePassword, deleteUserByIdController,  getTeamMembers } from '../controllers/userController.js';

    // save files in multer memory
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    const userRouter = express.Router();

    // the route for csv upload and add users
    userRouter.post('/upload', upload.single('file'), addUserFromCSV);

    // route to get user by ID
    userRouter.get('/:id', getUserById);

    // route to get all users
    userRouter.get('/', getAllUsers);

    // route to get team members
    userRouter.get('/team/:teamId/members', getTeamMembers);

    // route to update users password
    userRouter.put('/:id/password', updatePassword);

    // rote for deleting the user by their id
    userRouter.delete('/:id', deleteUserByIdController);

    export default userRouter;
