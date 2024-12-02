import {fetchUserById} from "../models/userModel.js";
import {verifyToken} from "../utils/jwt.js";

export const deserializeUser = (req, res, next) => {
    // lets get the token from the request
    const token = req.headers.authorization
    if (!token) {
        next();
        return;
    }

    // the token exists! Yay. Lets verify that we signed it...
    const userData = verifyToken(token);
    if (!userData) {
        next();
        return;
    }

    // The token seems valid! Now we find the user that belongs to the id we stored in the token
    fetchUserById(userData.userId, (error, result) => {
        if (error) {
            next();
            return;
        }

        if (result.length === 0) {
            next();
            return;
        }

        const userObj = result[0];

        res.locals.user = userObj;

        next();
    });
}
