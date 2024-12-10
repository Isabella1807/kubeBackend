import { verifyToken } from "../utils/jwt.js";
import { fetchUserById } from "../models/userModel.js";

export const deserializeUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header found");
        return next();
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        console.log("No token found in Authorization header");
        return next();
    }

    const userData = verifyToken(token);
    if (!userData) {
        console.log("Invalid or expired token");
        return next();
    }

    fetchUserById(userData.userId, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return next();
        }

        if (!result || result.length === 0) {
            console.log("User not found in database");
            return next();
        }

        const user = result[0];
        // Tilføj roleId fra token til user-objektet
        res.locals.user = { ...user, roleId: userData.roleId };
        console.log("Deserialized User:", res.locals.user);
        next();
    });
};

