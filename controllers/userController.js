import { parse } from 'csv-parse';
import { Readable } from 'stream'; 
import { createUser, fetchUserById, fetchAllUsers, updateUserPasswordById, deleteUserById } from '../models/userModel.js';
import kubeDB from '../Database.js';

export const addUserFromCSV = (req, res) => {
    const results = [];

    const csvParser = parse({ 
        columns: true, // Ensure columns are used as the headers
        skip_empty_lines: true
    });

    Readable.from(req.file.buffer.toString())
        .pipe(csvParser)
        .on('data', (row) => {
            console.log('Parsed Row:', row);  // Log the parsed row to verify

            const teamName = row.teamName; // Extract teamName from the CSV row
            console.log('Team Name:', teamName);  // Log to check if it's being parsed correctly

            // Check if all required fields are present in the row
            if (!row.uclMail || !row.password || !row.firstName || !row.lastName || !teamName || !row.roleId) {
                console.error('Missing required field in row:', row);
                return;
            }

            // Query the database for the teamId based on the teamName
            kubeDB.query('SELECT teamId FROM team WHERE teamName = ?', [teamName], (err, teamResult) => {
                if (err) {
                    console.error('Error retrieving team:', err);
                    return;
                }

                if (teamResult.length > 0) {
                    const teamId = teamResult[0].teamId;

                    const userData = {
                        uclMail: row.uclMail,
                        password: row.password,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        roleId: row.roleId,
                        teamId: teamId,
                    };

                    // Insert user data into the database
                    kubeDB.query('INSERT INTO users SET ?', userData, (err, result) => {
                        if (err) {
                            console.error('Error inserting user:', err);
                        } else {
                            console.log('User inserted:', result);
                        }
                    });
                } else {
                    console.error(`Team ${teamName} not found.`);
                }
            });
        })
        .on('end', () => {
            res.status(200).json({ message: 'Users successfully added from CSV.' });
        })
        .on('error', (err) => {
            console.error('CSV parsing error:', err);
            res.status(500).json({ error: 'Error processing CSV file.' });
        });
};

// Controller to fetch a user by ID
export const getUserById = (req, res) => {
    const userId = req.params.id;

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

// Controller to fetch all users
export const getAllUsers = (req, res) => {
    fetchAllUsers((err, result) => {
        if (err) {
            console.error("Error while fetching users:", err);
            res.status(500).json({ error: "Failed to fetch users." });
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    message: "All users retrieved successfully.",
                    users: result,
                });
            } else {
                res.status(404).json({ message: "No users found." });
            }
        }
    });
};

// Controller to update user password
export const updatePassword = (req, res) => {
    const userId = req.params.id;
    const newPassword = req.body.password;

    if (!newPassword) {
        return res.status(400).json({ message: "Password is required." });
    }

    updateUserPasswordById(userId, newPassword, (err, result) => {
        if (err) {
            console.error("Error updating password:", err);
            res.status(500).json({ error: "Failed to update password." });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Password updated successfully." });
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

        deleteUserById(userId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete user" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        });
    });
};
