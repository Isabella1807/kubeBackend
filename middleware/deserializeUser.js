import { verifyToken } from "../utils/jwt.js";
import { fetchUserById } from "../models/userModel.js";

export const deserializeUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header found");
        next(); // Gå videre, men brugeren er ikke autentificeret
        return;
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        console.log("No token found in Authorization header");
        next();
        return;
    }

    const userData = verifyToken(token); // Verify the token
    if (!userData) {
        console.log("Invalid or expired token");
        next(); // Proceed to the next middleware or route
        return;
    }

    console.log("Decoded user data from token:", userData);  // Debugging log

    // Fetch user from the database based on user ID stored in the token
    fetchUserById(userData.userId, (error, result) => {
        if (error) {
            console.error("Database error when fetching user:", error);
            next();
            return;
        }

        if (result.length === 0) {
            console.log("User not found in database");
            next();
            return;
        }

        const userObj = result[0];
        res.locals.user = userObj;
        console.log("User deserialized:", res.locals.user);
        next();  // Proceed to the next middleware or route
    });
};
