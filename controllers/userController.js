import { updateUserPasswordById, fetchUserById, fetchAllUsers, deleteUserById } from "../models/userModel.js";

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

export const getAllUsers = (req, res) => {
    fetchAllUsers((err, result) => {
        if (err) {
            console.error("Error while fetching users:", err);
            res.status(500).json({ error: "Failed to fetch users." });
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "All users retrieved successfully.",
                    users: result,  // Return the array of users
                });
            } else {
                res.status(404).json({ message: "No users found." });
            }
        }
    });
};

export const updatePassword = (req, res) => {
    const userId = req.params.id; // Get the userId from the route parameters
    const newPassword = req.body.password; // Get the new password from the request body

    if (!newPassword) {
        return res.status(400).json({ message: "Password is required." });
    }

    // Update the password in the database
    updateUserPasswordById(userId, newPassword, (err, result) => {
        if (err) {
            console.error("Error updating password:", err);
            res.status(500).json({ error: "Failed to update password." });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({
                    message: "Password updated successfully.",
                });
            } else {
                res.status(404).json({ message: "User not found or no changes made." });
            }
        }
    });
};


// Controller to delete a user by ID
export const deleteUserByIdController = (req, res) => {
    const userId = req.params.id;

    fetchUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Error checking user existence" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Call the model function to delete the user
        deleteUserById(userId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete user" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        });
    });
};