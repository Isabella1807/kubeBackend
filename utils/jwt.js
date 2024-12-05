import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    // Kontroller, at TOKEN_SECRET er defineret
    if (!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET is not defined');
    }
    
    // Opret JWT-token med payload og secret
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' });
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
