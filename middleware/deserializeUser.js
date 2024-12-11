import { verifyToken } from "../utils/jwt.js";
import { fetchUserById } from "../models/userModel.js";

export const deserializeUser = (req, res, next) => {
    console.log('A')

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next();
    }

    console.log('B')

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        return next();
    }

    console.log('C')

    const userData = verifyToken(token);
    if (!userData) {
        return next();
    }

    console.log('D')

    fetchUserById(userData.userId, (error, result) => {

        console.log('E')

        if (error) {
            return next();
        }

        console.log('F')

        if (!result || result.length === 0) {
            return next();
        }

        console.log('G')

        const userObj = result[0];
        res.locals.user = userObj;

        res.locals.user.role = {
            "isAdmin": userObj.roleId === 1,
            "isFaculty": userObj.roleId === 2,
            "isStudent": userObj.roleId === 3,
        }

        console.log('#¤%#¤%#¤%')
        console.log(res.locals)

        // Redundant, removed
        /*const user = result[0];
        // Tilføj roleId fra token til user-objektet
        res.locals.user = { ...user, roleId: userData.roleId };
        console.log("Deserialized User:", res.locals.user);*/
        next();
    });
};

