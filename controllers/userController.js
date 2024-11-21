import { createUser, fetchUserById } from "../models/userModel.js";

// Controller to handle creating a user
export const addUser = (req, res) => {
    const userData = {
        uclMail: "testuser@example.com",   // Hardcoded email
        password: "securepassword",        // Hardcoded password
        firstName: "John",                 // Hardcoded first name
        lastName: "Doe",                   // Hardcoded last name
        roleId: 1,                         // Assuming roleId exists
        teamId: 1                          // Assuming teamId exists
    };

    createUser(userData, (err, result) => {
        if (err) {
            console.error("Error while creating user:", err);
            res.status(500).json({ error: "Failed to create user." });
        } else {
            res.status(201).json({
                message: "Hardcoded user created successfully.",
                userId: result.insertId  // Return the created user ID
            });
        }
    });
};

// Controller to fetch user by ID
export const getUserById = (req, res) => {
    const userId = 17;  // Hardcoded user ID for testing

    fetchUserById(userId, (err, result) => {
        if (err) {
            console.error("Error while fetching user:", err);
            res.status(500).json({ error: "Failed to fetch user." });
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "User data retrieved successfully.",
                    user: result[0],  // Return the first matching user
                });
            } else {
                res.status(404).json({ message: "User not found." });
            }
        }
    });
};
