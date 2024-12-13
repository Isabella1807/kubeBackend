import express from "express";
import { loginController } from "../controllers/loginController.js";
import { mustBeLoggedIn } from "../middleware/authenticate.js";
import { updateUserPasswordById } from "../models/userModel.js";

const router = express.Router();

router.post("/",loginController.loginUser);
router.post("/logout", mustBeLoggedIn, (req, res) => {
    try {
        res.status(200).send("Logged out successfully");
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("An error occurred during logout");
    }
});

router.put("/changepassword", mustBeLoggedIn, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Check om felterne er udfyldt
        if (!oldPassword || !newPassword) {
            return res.status(400).send("Old and new passwords are required");
        }

        // Hent brugeren fra res.locals
        const user = res.locals.user;

        if (!user) {
            return res.status(401).send("User not authenticated");
        }

        // Check om den gamle adgangskode matcher
        if (user.password !== oldPassword) {
            return res.status(400).send("Old password is incorrect");
        }

        // Opdater adgangskoden i databasen
        await updateUserPasswordById(user.userId, newPassword);

        res.status(200).send("Password updated successfully");
    } catch (error) {
        console.error("Error during password change:", error);
        res.status(500).send("An error occurred during password change");
    }
});


export default router;

