import kubeDB from "../Database.js";

export const createUser = (userData, callback) => {
    const sql = `INSERT INTO users (uclMail, password, firstName, lastName, roleId, teamId) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        userData.uclMail,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.roleId,
        userData.teamId
    ];

    // Execute the query to insert user data
    kubeDB.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Function to fetch a user by ID from the database
export const fetchUserById = (userId, callback) => {
    const sql = `SELECT * FROM users WHERE userId = ?`;
    const values = [userId];  // Use the provided userId

    // Execute the query to fetch the user
    kubeDB.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Function to fetch all users from the database
export const fetchAllUsers = (callback) => {
    const sql = "SELECT * FROM users"; // Query to select all users

    // Execute the query to fetch all users
    kubeDB.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result); // Return all users
        }
    });
};

export const updateUserPasswordById = (userId, newPassword, callback) => {
    const sql = `
        UPDATE users
        SET password = ?
        WHERE userId = ?
    `;
    kubeDB.query(sql, [newPassword, userId], (err, result) => {
        if (err) {
            console.error("Error updating password:", err);
            callback(err, null);
        } else {
            callback(null, result); // Return the result of the update
        }
    });
};

// Function to delete a user by ID from the database
export const deleteUserById = (userId, callback) => {
    const sql = `DELETE FROM users WHERE userId = ?`;

    kubeDB.query(sql, [userId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};