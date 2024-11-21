import kubeDB from "../Database.js";

// Function to create a user
export const createUser = (userData, callback) => {
    const sql = `INSERT INTO users (uclMail, password, firstName, lastName, roleId, teamId) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        userData.uclMail,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.roleId,
        userData.teamId,
    ];

    kubeDB.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

