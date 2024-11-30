import express from "express";
import {loginController} from "../controllers/loginController.js";
import {mustBeLoggedIn} from "../middleware/authToken.js";


const router = express.Router();

router.post("/", loginController.loginUser);
router.get("/teest", mustBeLoggedIn, (req, res) => {
    res.send('goddag')
});

export default router;

