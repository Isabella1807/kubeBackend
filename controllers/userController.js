import { createUser } from "../models/userModel.js";

// Controller to handle creating a user with hardcoded data
export const addUser = (req, res) => {
    // Hardcoded user data for testing
    const userData = {
        uclMail: "test@example.com",
        password: "testpassword",
        firstName: "John",
        lastName: "Doe",
        roleId: 1,  // Make sure this exists in the `roles` table
        teamId: 1,  // Make sure this exists in the `teams` table
    };

    // Call the model function
    createUser(userData, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create user. Check database connection and table setup." });
        } else {
            res.status(201).json({
                message: "Hardcoded user created successfully.",
                userId: result.insertId,
            });
        }
    });
};
