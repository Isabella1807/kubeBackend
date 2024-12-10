import { generateToken } from "../utils/jwt.js";
import { getUserByMail } from "../models/userModel.js";

export const loginController = {
    loginUser: async (req, res) => {
        try {
            const userMail = req.body.uclMail;
            const userPassword = req.body.password.toString();

            console.log("Received Email:", userMail);

            if (!userMail.endsWith("@edu.ucl.dk")) {
                return res.status(403).send("Only emails ending with @edu.ucl.dk are allowed");
            }

            const userData = await getUserByMail(userMail);

            if (!userData || userPassword !== userData.password) {
                return res.status(400).send("Wrong mail or password");
            }

            // Generer token med userId og roleId
            const token = generateToken({ userId: userData.userId, roleId: userData.roleId });
            console.log("Generated Token:", token);

            // Returnér token og rolle til frontend
            res.json({ token: token, role: userData.roleId });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send("An error occurred during login");
        }
    },
};
