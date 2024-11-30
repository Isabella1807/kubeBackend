import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

export const generateToken = (payload) => {
    //.sign takes an object with data, a string that's secret and any options, in this case an expiration time.
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    return token;
}

export const verifyToken = (token) => {
    //.verify takes a token, a secret key, any options(optional) and a callback function
    return jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
            return false;
        }
        return payload;
    })
}
