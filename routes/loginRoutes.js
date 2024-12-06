import express from "express";
import { loginController } from "../controllers/loginController.js";
import { mustBeAdmin, mustBeFaculty, mustBeLoggedIn } from "../middleware/authenticate.js";


const router = express.Router();

router.post("/", loginController.loginUser);
router.post("/logout", mustBeLoggedIn, (req, res) => {
    try {
        // Her kan du tilføje logik til at invalidere tokens server-side, hvis du bruger blacklisting
        // For eksempel, hvis du har en blacklist, kan du tilføje tokenet til den

        res.status(200).send("Logged out successfully"); // Returnér en succesmeddelelse
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("An error occurred during logout");
    }
});

export default router;

