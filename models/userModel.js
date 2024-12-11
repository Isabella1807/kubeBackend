import kubeDB from "../Database.js";

// makes a new user in the database
export const createUser = async (userData) => {
    try {
        const [result] = await kubeDB.promise().query('INSERT INTO users SET ?', userData);
        return result;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

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

//Used in loginController
export const getUserByMail = (userMail) => new Promise((resolve, reject) => {
    if (!userMail) reject();

    kubeDB.query(`SELECT password, userId FROM users WHERE uclMail = '${userMail}'`, (error, result) => {
        if (error) {
            reject("Model get by ucl mail error");
        } else {
            resolve(result[0]);
        }
    })
})


// Funktionen til at finde af brugerer på siden 
// find the user on the page 
export const fetchAllUsers = (callback) => {
    const sql = `SELECT users.userId, 
                        users.uclMail, 
                        users.firstName, 
                        users.lastName, 
                        users.roleId, 
                        users.teamId,
                        team.teamName 
                 FROM users 
                 LEFT JOIN team ON users.teamId = team.teamId`;

    kubeDB.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// get all users by team id
export const getUsersByTeamId = (teamId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT users.userId,
                            users.uclMail,
                            users.firstName,
                            users.lastName,
                            users.roleId
                     FROM users
                     WHERE users.teamId = ?`;

        kubeDB.query(sql, [teamId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


// function to update password
export const updateUserPasswordById = async (userId, newPassword) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE users SET password = ? WHERE userId = ?`;

        kubeDB.query(query, [newPassword, userId], (error, results) => {
            if (error) {
                console.error("Error updating password:", error);
                reject(error);
            } else {
                console.log("Password updated successfully for userId:", userId);
                resolve(results);
            }
        });
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