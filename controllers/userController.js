import { createUser, fetchUserById } from "../models/userModel.js";

// kontroller til lav ny bruger
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


// kontroller til at få brugeren via id
export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    //model til få fat på brugeren via id
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