import {generateToken} from "../utils/jwt.js";
import {getUserByMail} from "../models/userModel.js";

export const loginController = {
    loginUser: async (req, res) => {
        try {
            const userMail = req.body.uclMail;
            const userPassword = req.body.password.toString();

            console.log("Received Email:", userMail);
            console.log("Received Password:", userPassword);

            if (!userMail.endsWith("@edu.ucl.dk")) {
                console.log("Invalid Email Domain");
                return res.status(403).send("Only emails ending with @edu.ucl.dk are allowed");
            }

            const userData = await getUserByMail(userMail);

            if (!userData) {
                console.log("User not found in database");
                return res.status(400).send("Wrong mail or password");
            }

            console.log("Fetched User Data:", userData);

            if (userPassword !== userData.password) {
                console.log("Password does not match");
                return res.status(400).send("Wrong mail or password");
            }

            const token = generateToken({ userId: userData.userId });
            console.log("Generated Token:", token);

            res.json({ token: token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send("An error occurred during login");
        }
    }
};
