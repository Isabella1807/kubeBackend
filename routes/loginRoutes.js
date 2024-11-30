import express from "express";
import {loginController} from "../controllers/loginController.js";
import {mustBeAdmin, mustBeFaculty, mustBeLoggedIn} from "../middleware/authenticate.js";


const router = express.Router();

router.post("/", loginController.loginUser);
router.get("/teest", mustBeFaculty, (req, res) => {
    res.send('goddag')
});

export default router;

