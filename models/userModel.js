import kubeDB from "../Database.js";

// function to create user 
export const createUser = async (userData) => {
    try {
      const [result] = await db.query(
        'INSERT INTO users (uclMail, password, firstName, lastName, roleId, teamId) VALUES (?, ?, ?, ?, ?, ?)',
        [
          userData.uclMail,
          userData.password,
          userData.firstName,
          userData.lastName,
          userData.roleId,
          userData.teamId
        ]
      );
  
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
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

    // Opdater forespørgslen for at hente userId, password og roleId
    const query = `SELECT password, userId, roleId FROM users WHERE uclMail = ?`;
    kubeDB.query(query, [userMail], (error, result) => {
        if (error) {
            reject("Model get by ucl mail error");
        } else {
            resolve(result[0]); // returnerer første bruger, da vi antager, at mailen er unik
        }
    })
})


// Funktionen til at finde af brugerer på siden 
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