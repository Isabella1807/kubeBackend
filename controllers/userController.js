import { parse } from 'csv-parse';
import { Readable } from 'stream';
import { getOrCreateTeam } from '../models/teamModel.js';
import { createUser, fetchUserById, fetchAllUsers, updateUserPasswordById, deleteUserById } from '../models/userModel.js';
// this function takes the csv file and does that users can be added to the database
export const addUserFromCSV = async (req, res) => {
    try {
        const results = [];
        const rows = [];
        const csvParser = parse({ 
            columns: true,
            skip_empty_lines: true
        });
        // save the row in a array from the csv
        csvParser.on('data', (row) => rows.push(row));
        // the function runs through the rows from the csv
        const processRows = async () => {
            // check if all info is there 
            for (const row of rows) {
                if (!row.uclMail || !row.password || !row.firstName || !row.lastName || !row.teamName || !row.roleId) {
                    console.error('Missing required field in row:', row);
                    continue;
                }
                try {
                    // finds the user or creates the team or user 
                    const teamId = await getOrCreateTeam(row.teamName);
                    const userData = {
                        uclMail: row.uclMail,
                        password: row.password,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        roleId: row.roleId,
                        teamId: teamId
                    };
                    // create the user in the database 
                    await createUser(userData);
                    results.push(userData);
                } catch (err) {
                    console.error('Error processing row:', err);
                }
            }
        };
        // reads the file 
        Readable.from(req.file.buffer.toString())
            .pipe(csvParser)
            .on('end', async () => {
                try {
                    await processRows();
                    res.status(200).json({ 
                        message: 'Users successfully added from CSV.',
                        usersAdded: results.length
                    });
                } catch (err) {
                    console.error('Error processing CSV:', err);
                    res.status(500).json({ error: 'Error processing CSV file.' });
                }
            })
            .on('error', (err) => {
                console.error('CSV parsing error:', err);
                res.status(500).json({ error: 'Error processing CSV file.' });
            });

    } catch (err) {
        console.error('Error in CSV upload:', err);
        res.status(500).json({ error: 'Server error processing upload.' });
    }
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
