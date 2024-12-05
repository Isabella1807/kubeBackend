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
    //.verify takes a token, a secret key, any options(optional) and a callback function
    return jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
            return false;
        }
        return payload;
    })
}
