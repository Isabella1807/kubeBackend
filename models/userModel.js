import kubeDB from "../Database.js";

// create user model som virker med hardcoded data 
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

    // insæt ny brugerdata 
    kubeDB.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// funktionen til at finde en bruger via userid
export const fetchUserById = (userId, callback) => {
    const sql = `SELECT * FROM users WHERE userId = ?`;
    const values = [userId];  

    
    kubeDB.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Funktionen til at finde af brugerer på siden 
export const fetchAllUsers = (callback) => {
    const sql = "SELECT * FROM users"; 

 
    kubeDB.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result); 
        }
    });
};


// funktionen til at kunne UPDATE password 
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
            callback(null, result); 
        }
    });
};

// Funktionen til at kunne slette en bruger via deres uiserID 
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