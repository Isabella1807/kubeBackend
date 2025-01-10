import kubeDB from "../Database";
import {User as UserType, UserCreateData, UserWithPassword} from "../types/user";
import User from "../database/models/User";
import Team from "../database/models/Team";


export const createUser = (userData: UserCreateData): Promise<UserCreateData> => new Promise((resolve, reject) => {
    User.create({...userData}).then((result) => {
        resolve(result.dataValues);
    }).catch((err) => {
        reject(err);
    })
});

export const fetchUserById = (userId: number): Promise<UserType> => new Promise((resolve, reject) => {
    User.findOne({
        where: {userId: userId}
    }).then((result) => {
        console.log(result);
        resolve(result.dataValues);
    }).catch((err) => {
        console.log(err);
        reject(err);
    })
});

//Used in loginController
export const getUserByMail = (userMail: string): Promise<UserWithPassword> => new Promise((resolve, reject) => {
    if (!userMail) reject();

    User.findOne({
        where: {uclMail: userMail},
        attributes: ['password', 'userId', 'roleId']
    }).then((user) => {
        resolve(user.dataValues);
    }).catch((err) => {
        console.error('Error creating user:', err);
        reject("Model get by ucl mail error");
    })
});

export const fetchAllUsers = (): Promise<User[]> => new Promise((resolve, reject) => {
    User.findAll({
        attributes: ['userId', 'uclMail', 'firstName', 'lastName', 'roleId', 'teamId'],
        include: [
            {
                model: Team,
                attributes: ['teamName'],
            }
        ],
    }).then((result) => {
        // unpack from dataValues AND unpack nested teamName from its object in its own dataValues
        resolve(result.map(userResult => {
            const {team, ...rest} = userResult.dataValues;
            return {
                ...rest,
                teamName: team.dataValues.teamName
            }
        }));
    }).catch((err) => {
        reject(err);
    })
});

// Funktionen til at finde af brugerer på siden 
// find the user on the page 
/*export const fetchAllUsers = (callback) => {
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
};*/

// get all users by team id

export const getUsersByTeamId = (teamId: number): Promise<User[]> => new Promise((resolve, reject) => {
    User.findAll({
        where: {teamId: teamId},
        attributes: ['userId', 'uclMail', 'firstName', 'lastName', 'roleId'],
        raw: true
    }).then((result) => {
        resolve(result)
    }).catch((err) => {
        console.log(err)
        reject(err);
    })
});


/*export const getUsersByTeamId = (teamId) => {
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
};*/


// function to update password

export const updateUserPasswordById = (userId: number, newPassword: string):Promise<number> => new Promise((resolve, reject) => {
    User.update({
            password: newPassword
        },
        {
            where: {userId: userId}
        }).then((result) => {
        resolve(result[0])
    }).catch((err) => {
        reject(err);
    })
});

/*export const updateUserPasswordById = async (userId, newPassword) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE users SET password = ? WHERE userId = ?`;

        kubeDB.query(query, [newPassword, userId], (error, results) => {
            if (error) {
                console.error("Error updating password:", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};*/


// function to delete user by their id

export const deleteUserById = (userId: number) => new Promise((resolve, reject) => {
    User.destroy({
        where: {userId: userId}
    }).then((result) => {
        resolve(result)
    }).catch((err) => {
        reject(err);
    })
});

/*
export const deleteUserById = (userId, callback) => {
    const sql = `DELETE
                 FROM users
                 WHERE userId = ?`;
    kubeDB.query(sql, [userId], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};*/
