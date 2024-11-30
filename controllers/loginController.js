import dotenv from "dotenv";
import {generateToken} from "../utils/jwt.js";

dotenv.config()

export const loginController = {
    loginUser: async (req, res) => {

        try {
            const username = req.body.username;

            const user = {
                name: username
            }
            const token = generateToken(user);

            res.json({token: token});

        } catch (e) {

        }
    }
}