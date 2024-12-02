import { parse } from 'csv-parse';
import { Readable } from 'stream'; 
import { createUser, fetchUserById, fetchAllUsers, updateUserPasswordById, deleteUserById } from '../models/userModel.js';
import kubeDB from '../Database.js';

export const addUserFromCSV = async (req, res) => {
    try {
        const results = [];
        const processedTeams = new Map();

        const csvParser = parse({ 
            columns: true,
            skip_empty_lines: true
        });

        // Promise-based query function
        const queryDB = (sql, params) => {
            return new Promise((resolve, reject) => {
                kubeDB.query(sql, params, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        };

        // Function to get or create team
        const getOrCreateTeam = async (teamName) => {
            // Check if we've already processed this team
            if (processedTeams.has(teamName)) {
                return processedTeams.get(teamName);
            }

            // Check if team exists
            const teamResult = await queryDB('SELECT teamId FROM team WHERE teamName = ?', [teamName]);
            
            if (teamResult.length > 0) {
                const teamId = teamResult[0].teamId;
                processedTeams.set(teamName, teamId);
                return teamId;
            }

            // Create new team if it doesn't exist
            const newTeam = await queryDB('INSERT INTO team (teamName) VALUES (?)', [teamName]);
            const newTeamId = newTeam.insertId;
            processedTeams.set(teamName, newTeamId);
            return newTeamId;
        };

        // Function to create user
        const createUser = async (userData) => {
            try {
                await queryDB('INSERT INTO users SET ?', userData);
                results.push(userData);
            } catch (err) {
                console.error('Error creating user:', err);
                throw err;
            }
        };

        const rows = [];
        csvParser.on('data', (row) => rows.push(row));

        const processRows = async () => {
            for (const row of rows) {
                if (!row.uclMail || !row.password || !row.firstName || !row.lastName || !row.teamName || !row.roleId) {
                    console.error('Missing required field in row:', row);
                    continue;
                }

                try {
                    const teamId = await getOrCreateTeam(row.teamName);
                    await createUser({
                        uclMail: row.uclMail,
                        password: row.password,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        roleId: row.roleId,
                        teamId: teamId
                    });
                } catch (err) {
                    console.error('Error processing row:', err);
                }
            }
        };

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
