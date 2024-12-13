import { verifyToken } from "../utils/jwt.js";
import { fetchUserById } from "../models/userModel.js";

export const deserializeUser = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next();
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        return next();
    }


    const userData = verifyToken(token);
    if (!userData) {
        return next();
    }

    fetchUserById(userData.userId, (error, result) => {

        if (error) {
            return next();
        }

        if (!result || result.length === 0) {
            return next();
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
};

