import fs from 'fs';
import csvParser from 'csv-parser';
import { createUser, fetchUserById, fetchAllUsers, updateUserPasswordById, deleteUserById } from "../models/userModel.js";
import kubeDB from '../Database.js'; // Import the MySQL connection from your kubeDB.js

// Kontroller til lav ny bruger
export const addUser = (req, res) => {
    const { uclMail, password, firstName, lastName, roleId, teamId } = req.body;

    if (!uclMail || !password || !firstName || !lastName || !roleId || !teamId) {
        return res.status(400).json({ message: "All fields are required." });
    }
    createUser(
        { uclMail, password, firstName, lastName, roleId, teamId },
        (err, result) => {
            if (err) {
                console.error("Error creating user:", err);
                return res.status(500).json({ error: "Failed to create user." });
            }

            res.status(201).json({
                message: "User created successfully.",
                userId: result.insertId, 
            });
        }
    );
};

// Kontroller til at få brugeren via id
export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    // Model til at få fat på brugeren via id
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

// Kontroller til at få alle brugere
export const getAllUsers = (req, res) => {
    fetchAllUsers((err, users) => {
        if (err) {
            console.error("Error fetching all users:", err);
            return res.status(500).json({ error: "Failed to fetch users." });
        }

        res.status(200).json(users);
    });
};

// Kontroller til update password
export const updateUserPassword = (req, res) => {
    const userId = parseInt(req.params.id, 10); // Extract userId from URL params
    const { newPassword } = req.body; // Extract new password from the request body

    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    if (!newPassword) {
        return res.status(400).json({ message: "New password is required." });
    }

    updateUserPasswordById(userId, newPassword, (err, result) => {
        if (err) {
            console.error("Error updating password:", err);
            return res.status(500).json({ error: "Failed to update password." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Password updated successfully." });
    });
};

// Delete user via id
export const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id, 10); 

    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    deleteUserById(userId, (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "Failed to delete user." });
        }

        if (result.message) {
            return res.status(404).json({ message: result.message });
        }

        res.status(200).json({ message: "User deleted successfully." });
    });
};

// Kontroller til CSV file upload og process
export const CSVupload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const users = [];

    // unsersøge csv filen
    fs.createReadStream(filePath)
        .pipe(csvParser())  // putter csv filen til csv parse
        .on('data', (row) => {
            // ekstrakt data fra csv rækken 
            const { uclMail, password, firstName, lastName, roleId, teamName } = row;

            // får fat på teamId baseret på teamName
            kubeDB.query('SELECT teamId FROM team WHERE teamName = ? LIMIT 1', [teamName], (err, results) => {
                if (err) {
                    console.error('Error fetching teamId:', err);
                    return;
                }

                if (results.length > 0) {
                    const teamId = results[0].teamId;

                    // indsætter user information indtil user table med teamid
                    createUser({ uclMail, password, firstName, lastName, roleId, teamId }, (insertErr, result) => {
                        if (insertErr) {
                            console.error('Error inserting user:', insertErr);
                        } else {
                            console.log('User inserted:', result);
                        }
                    });
                } else {
                    // hvis man ikke finder en teamname så kommer der en fejl
                    console.error('Team not found for teamName:', teamName);
                }
            });
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            res.status(200).json({ message: 'CSV file processed and users added successfully' });
        })
        .on('error', (err) => {
            console.error('Error processing CSV file:', err);
            res.status(500).json({ message: 'Error processing CSV file', error: err });
        });
};
