import { updateUserPasswordById, fetchUserById, fetchAllUsers, deleteUserById } from "../models/userModel.js";

// Controller to handle creating a user
export const addUser = (req, res) => {
   //Hardcoded data ved create user - siden at jeg ikke kan få det shit til at virke 
    const userData = {
        uclMail: "testuser@example.com",  
        password: "securepassword",        
        firstName: "John",                 
        lastName: "Doe",                   
        roleId: 1,                        
        teamId: 1                          
    };

    createUser(userData, (err, result) => {
        if (err) {
            console.error("Error while creating user:", err);
            res.status(500).json({ error: "Failed to create user." });
        } else {
            res.status(201).json({
                message: "Hardcoded user created successfully.",
                userId: result.insertId  // giver userid tilbage 
            });
        }
    });
};





// Controller til hente user med ID Igen hardcoded 
export const getUserById = (req, res) => {
    const userId = 20;  

    fetchUserById(userId, (err, result) => {
        if (err) {
            console.error("Error while fetching user:", err);
            res.status(500).json({ error: "Failed to fetch user." });
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "User data retrieved successfully.",
                    user: result[0], 
                });
            } else {
                res.status(404).json({ message: "User not found." });
            }
        }
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