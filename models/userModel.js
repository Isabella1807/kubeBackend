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