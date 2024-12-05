import kubeDB from "../Database.js";

// data queries
const queryDB = (sql, params) => {
    return new Promise((resolve, reject) => {
        kubeDB.query(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


// makes a new user in the database
const createUser = async (userData) => {
    try {
        return await queryDB('INSERT INTO users SET ?', userData);
    } catch (err) {
        console.error('Error with creating user:', err);
        throw err;
    }
};

export {queryDB, createUser};

// function find user by id
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

// find the user on the page 
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


// function to update password
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

// function to delete user by their id 
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