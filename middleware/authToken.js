import {verifyToken} from "../utils/jwt.js";

export const mustBeLoggedIn = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.sendStatus(401)

    const user = verifyToken(token);
    if (!user) {
        return res.sendStatus(403);
    } else {
        req.user = user;
        next();
    }


}
