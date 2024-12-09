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

        // tilføj .isAdmin, .isStudent, .isTeacher til locals her, for at holde logikken ét sted, i stedet for at tjekke om "roleId === 3" i flere forskellige filer

        next();
    });
}
