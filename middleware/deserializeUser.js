import {fetchUserById} from "../models/userModel.js";
import {verifyToken} from "../utils/jwt.js";

export const deserializeUser = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        next();
        return;
    }

    const userData = verifyToken(token);
    if (!userData) {
        next();
        return;
    }

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

        res.locals.user.role = {
            "isAdmin": userObj.roleId === 1,
            "isFaculty": userObj.roleId === 2,
            "isStudent": userObj.roleId === 3,
        }

        next();
    });
}
