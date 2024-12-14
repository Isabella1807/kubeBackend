import { generateToken } from "../utils/jwt.js";
import { getUserByMail } from "../models/userModel.js";

export const loginController = {
    loginUser: async (req, res) => {
        try {
            const userMail = req.body.uclMail;
            const userPassword = req.body.password.toString();

            // Tjek email-domæne og rolle
            let validEmail = false;

            if (userMail.endsWith("@edu.ucl.dk")) {
                // Studerende
                validEmail = true;
            } else if (userMail.endsWith("@ucl.dk")) {
                // Fakultet eller administrator
                validEmail = true;
            }

            if (!validEmail) {
                return res.status(403).send("Invalid email domain");
            }

            const userData = await getUserByMail(userMail);

            if (!userData || userPassword !== userData.password) {
                return res.status(400).send("Wrong mail or password");
            }

            // Tjek rolle for studerende
            if (userMail.endsWith("@edu.ucl.dk") && userData.roleId !== 3) {
                return res.status(403).send("Only students can use @edu.ucl.dk emails");
            }

            // Tjek rolle for fakultet og admin
            if (userMail.endsWith("@ucl.dk") && ![1, 2].includes(userData.roleId)) {
                return res.status(403).send("Only faculty or admin can use @ucl.dk emails");
            }

            // Generer token med userId og roleId
            const token = generateToken({ userId: userData.userId });

            // Returnér token og rolle til frontend
            res.json({ token: token, role: userData.roleId, userId: userData.userId });
        } catch (error) {
            res.status(500).send("An error occurred during login");
        }
    },
};
