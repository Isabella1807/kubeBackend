import kubeDB from "../Database.js";

// funktionen til at create user (lave en bruger)
export const createUser = (userData, callback) => {
    const { uclMail, password, firstName, lastName, roleId, teamId } = userData;

    const sql = `
        INSERT INTO users (uclMail, password, firstName, lastName, roleId, teamId)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    kubeDB.query(
        sql,
        [uclMail, password, firstName, lastName, roleId, teamId],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        }
    );
};


// funktionen til at finde en bruger via ID
export const fetchUserById = (userId, callback) => {
    const sql = `
        SELECT userId, uclMail, firstName, lastName, roleId, teamId
        FROM users
        WHERE userId = ?
    `;

    kubeDB.query(sql, [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // hvis ingen bruger er fundet med det id, så returer med en fejl besked
        if (results.length === 0) {
            return callback(null, null);
        }

        // kommer med det første result med det brugerid
        callback(null, results[0]);
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