/*import {generateToken, verifyToken} from '../utils/jwt.js'
import jwt from "jsonwebtoken";


export const loginController = {
    loginUser: async (req, res) => {
        try {
            const username = req.body.username;

            const user = {
                name: username
            }

            const token = generateToken(user)
            res.json({token: token})


            console.log("hejsa");
            console.log(req.body);
        } catch {

        }
    },
    authToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
            if (error) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
}*/