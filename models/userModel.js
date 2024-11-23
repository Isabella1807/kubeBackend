import kubeDB from "../Database.js";

// lave en bruger funktion
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


// få bruger via id
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

        //hvis en bruger findes retur en fejlbesked
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

// få alle bruger
export const fetchAllUsers = (callback) => {
    const sql = `
        SELECT userId, uclMail, firstName, lastName, roleId, teamId
        FROM users
    `;

    kubeDB.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return callback(err, null);
        }

        callback(null, results);
    });
};

//update Password 
export const updateUserPasswordById = (userId, newPassword, callback) => {
    const sql = `
        UPDATE users
        SET password = ?
        WHERE userId = ?
    `;

    kubeDB.query(sql, [newPassword, userId], (err, result) => {
        if (err) {
            console.error("Error updating password:", err);
            return callback(err, null);
        }

        callback(null, result);
    });
};

// delete user funktion
export const deleteUserById = (userId, callback) => {
    const sql = `
        DELETE FROM users
        WHERE userId = ?
    `;

    kubeDB.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return callback(err, null);
        }

        if (result.affectedRows === 0) {
            return callback(null, { message: "User not found." });
        }

        callback(null, result);
    });
};