import { verifyToken } from "../utils/jwt";
import { fetchUserById } from "../models/userModel";

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

    fetchUserById(userData.userId).then(user => {
        res.locals.user = user;
        res.locals.user.role = {
            "isAdmin": user.roleId === 1,
            "isFaculty": user.roleId === 2,
            "isStudent": user.roleId === 3,
        }
        next();
    }).catch((err) => {
        next();
    })
};

