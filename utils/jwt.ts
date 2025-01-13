//@ts-ignore
import jwt from 'jsonwebtoken';

//@ts-ignore
export const generateToken = (payload) => {
    if (!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET is not defined');
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    return token;
};

//@ts-ignore
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        // @ts-ignore
        console.error("Error verifying token:", error.message);
        return false;
    }
};
