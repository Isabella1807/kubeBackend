import {parse} from 'csv-parse';
import {Readable} from 'stream';
import {getOrCreateTeam} from '../models/teamModel';
import {
    createUser,
    fetchUserById,
    fetchAllUsers,
    updateUserPasswordById,
    deleteUserById,
    getUsersByTeamId
} from '../models/userModel';
import {Request, Response} from "express";

// this function takes the csv file and does that users can be added to the database
export const addUserFromCSV = async (req, res) => {
    try {
        const results = [];
        const rows = [];
        const csvParser = parse({
            columns: true,
            skip_empty_lines: true
        });
        // save the row in an array from the csv
        csvParser.on('data', (row) => rows.push(row));
        // the function runs through the rows from the csv
        const processRows = async () => {
            // check if all info is there 
            for (const row of rows) {
                if (!row.uclMail || !row.password || !row.firstName || !row.lastName || !row.roleId) {
                    console.error('Missing required field in row:', row);
                    continue;
                }
                try {
                    const ownTeamName = req.body.teamName;
                    // finds the user or creates the team or user 
                    const teamId = await getOrCreateTeam(ownTeamName);
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
                    res.status(500).json({error: 'Error processing CSV file.'});
                }
            })
            .on('error', (err) => {
                res.status(500).json({error: 'Error processing CSV file.'});
            });

    } catch (err) {
        res.status(500).json({error: 'Server error processing upload.'});
    }
};


// Controller to fetch a user by ID

export const getUserById = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    fetchUserById(userId).then((user) => {
        res.status(200).json({
            message: "User data retrieved successfully.",
            user,
        });
    }).catch((err) => {
        res.status(404).json({message: "User not found."});
    })
};

// Controller to fetch all users
export const getAllUsers = (req: Request, res: Response) => {
    fetchAllUsers().then((users) => {
        res.status(200).json({
            message: "User data retrieved successfully.",
            users,
        });
    }).catch((err) => {
        console.log(err);
        res.status(404).json({message: "Users not found."});
    })

    /*((err, result) => {
        if (err) {
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
    });*/
};

// Controller to update user password
export const updatePassword = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const newPassword = req.body.password;

    if (!newPassword) {
        res.status(400).json({message: "Password is required."});
        return;
    }

    updateUserPasswordById(userId, newPassword).then((affectedItems) => {
        res.status(200).json({
            message: "Password updated successfully."
        })
    }).catch((err) => {
        res.status(404).json({message: "User not found or no changes made."});
    });

    /*try {
        const result = await updateUserPasswordById(userId, newPassword);
        // @ts-ignore
        if (result > 0) {
            res.status(200).json({message: "Password updated successfully."});
        } else {
            res.status(404).json({message: "User not found or no changes made."});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update password."});
    }*/
};

// Controller to delete a user by ID
export const deleteUserByIdController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    await deleteUserById(userId).then((user) => {
        res.status(200).json({
            message: "User deleted successfully.",
            user,
        });
    }).catch((err) => {
        res.status(404).json({message: "User not found."});
    })
}
/*
=> {
        if (err) {
            return res.status(500).json({error: "Failed to delete user"});
        }
        res.status(200).json({message: "User deleted successfully"});
    });
};*/

// retrive members in the database
export const getTeamMembers = async (req: Request, res: Response) => {
    const teamId = parseInt(req.params.teamId);
    try {
        const users = await getUsersByTeamId(teamId);
        res.status(200).json({
            message: "Team members retrieved successfully",
            users: users
        });
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({error: "Failed to fetch team members"});
    }
};

// function to make a single user in edit group
export const createSingleUser = async (req, res) => {
    try {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            uclMail: req.body.uclMail,
            roleId: req.body.roleId,
            teamId: req.body.teamId,
            password: 'DefaultPassword123!'
        };
        await createUser(userData);
        res.status(200).json({message: "User created successfully"});
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({error: "Failed to create user"});
    }
};
