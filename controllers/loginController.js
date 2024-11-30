import dotenv from "dotenv";
import {generateToken} from "../utils/jwt.js";
import {getUserByMail} from "../models/userModel.js";

dotenv.config();

export const loginController = {
    loginUser: async (req, res) => {

        try {
            const userMail = req.body.uclMail;
            const userPassword = req.body.password.toString();

            const user = await getUserByMail(userMail);

            if (!user) {
                return res.status(400).send("Wrong mail or password");
            }

            if (userPassword !== user.password) {
                return res.status(400).send("Wrong mail or password");
            }

            const token = generateToken(user);
            res.json({token: token});

        } catch (error) {
            res.sendStatus(500).send(error);
        }
    }
}
