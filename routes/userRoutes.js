import express from "express";
import multer from 'multer';
import fs from 'fs';
import { addUser, getUserById, getAllUsers, updateUserPassword, deleteUser, CSVupload } from "../controllers/userController.js";

const userRouter = express.Router();

// laver autmatisk en uploads folder til at gemme csv fil
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// konfigurere multer opbevaring
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // sætter stedet hvor at folderen skal være
    },
    filename: (req, file, cb) => {
        // ændre filen navne for at de er unikke med dato og tid
        cb(null, `csv_${Date.now()}.csv`);
    }
});

// sætter up multer for csv fil upload
const upload = multer({ storage: storage });

userRouter.post("/", addUser);
userRouter.get("/:id", getUserById); 
userRouter.get("/", getAllUsers);
userRouter.put("/:id/password", updateUserPassword);
userRouter.delete("/:id", deleteUser);
userRouter.post('/upload', upload.single('csvFile'), CSVupload); 

export default userRouter;
