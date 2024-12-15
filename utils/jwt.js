import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    if (!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET is not defined');
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    return token;
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return false;
    }
};
