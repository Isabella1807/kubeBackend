import { createUser, updateUserPasswordById, fetchUserById, fetchAllUsers, deleteUserById } from "../models/userModel.js";

// Controller to add a new user
export const addUser = (req, res) => {
    // Extract data from the request body
    const { uclMail, password, firstName, lastName, roleId, teamId } = req.body;

    // Validate required fields
    if (!uclMail || !password || !firstName || !lastName || !roleId || !teamId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Call the model to create the user
    createUser(
        { uclMail, password, firstName, lastName, roleId, teamId },
        (err, result) => {
            if (err) {
                console.error("Error creating user:", err);
                return res.status(500).json({ error: "Failed to create user." });
            }

            res.status(201).json({
                message: "User created successfully.",
                userId: result.insertId, // Returning the ID of the newly created user
            });
        }
    );
};
// Controller to get a user by ID
export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10); // Extract userId from URL params

    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    // Call the model to fetch the user
    fetchUserById(userId, (err, user) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Failed to fetch user." });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    });
};

// får alle bruger på siden 
export const getAllUsers = (req, res) => {
    fetchAllUsers((err, result) => {
        if (err) {
            console.error("Error while fetching users:", err);
            res.status(500).json({ error: "Failed to fetch users." });
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "All users retrieved successfully.",
                    users: result,  // viser et array af alle user på siden
                });
            } else {
                res.status(404).json({ message: "No users found." });
            }
        }
    });
};


// UPDATE PASSWORD 
export const updatePassword = (req, res) => {
    const userId = req.params.id; 
    const newPassword = req.body.password; // får det nye password fra req body 

    if (!newPassword) {
        return res.status(400).json({ message: "Password is required." });
    }

    // Updater password i databasen
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


// Hvordan man kan slette en bruger via ID
export const deleteUserByIdController = (req, res) => {
    const userId = req.params.id;

    fetchUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Error checking user existence" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // kalder til model funktionen til at slette en bruger 
        deleteUserById(userId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete user" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        });
    });
};