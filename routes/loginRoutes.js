import express from "express";
import { loginController } from "../controllers/loginController.js";
import { mustBeLoggedIn } from "../middleware/authenticate.js";
import { updateUserPasswordById } from "../models/userModel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Everything about login
 * paths:
 *   /login:
 *     post:
 *       tags:
 *         - Login
 *       summary: Login
 *       description: To be able to login you must send a body containing a valid ucl mail and password.
 *       operationId: login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - uclMail
 *                 - password
 *               properties:
 *                 uclMail:
 *                   type: string
 *                   description: The UCL email of the user
 *                   example: "student@edu.ucl.dk"
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *                   example: "123"
 *       responses:
 *         '200':
 *           description: success
 *         '400':
 *           description: error
 */

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

