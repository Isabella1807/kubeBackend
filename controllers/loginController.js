import {generateToken} from "../utils/jwt.js";
import {getUserByMail} from "../models/userModel.js";

export const loginController = {
    loginUser: async (req, res) => {

        try {
            const userMail = req.body.uclMail;
            const userPassword = req.body.password.toString();

            const userData = await getUserByMail(userMail);

            if (!userData) {
                return res.status(400).send("Wrong mail or password");
            }

            if (userPassword !== userData.password) {
                return res.status(400).send("Wrong mail or password");
            }

            const token = generateToken({userId: userData.userId});
            res.json({token: token});

        } catch (error) {
            res.sendStatus(500).send(error);
        }
    }
}
