import dotenv from "dotenv";
import {generateToken} from "../utils/jwt.js";
import {getUserByMail} from "../models/userModel.js";

dotenv.config()

export const loginController = {
    loginUser: async (req, res) => {

        try {
            const userMail = req.body.uclMail;
            const userPassword = req.body.password;

            try {
                const user = await getUserByMail(userMail);
                console.log(user);
            } catch (error) {
                return res.status(400).send(error);
            }

            const user = {
                userMail: userMail,
                userPassword: userPassword
            }
            const token = generateToken(user);

            res.json({token: token});

        } catch (error) {
            res.sendStatus(500).send(error);
        }
    }
}