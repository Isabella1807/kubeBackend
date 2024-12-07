import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET); // Kontroller, om secret er sat

    if (!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET is not defined');
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' });
    return token;
};

export const verifyToken = (token) => {
    try {
        // Verificer token synkront
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return false;
    }
};
