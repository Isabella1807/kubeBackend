import kubeDB from "../Database";
import Team from "../database/models/Team";
import User from "../database/models/User";
import {BaseTeam, CountedTeam} from "../types/team";
import {Sequelize} from 'sequelize';
import minDB from "../database/connection";
import {BaseTemplate} from "../types/template";
import user from "../database/models/User";
import Project from "../database/models/Project";

// get all team

export const getAllTeams = (): Promise<CountedTeam[]> => new Promise((resolve, reject) => {
    Team.findAll({
        attributes: [
            'teamId',
            'teamName',
            //Counts amount of userId
            [Sequelize.fn('COUNT', Sequelize.col('users.userId')), 'memberCount']
        ],
        //Makes relation between user and team and makes it possible to count users in team
        include: [{
            model: User,
            attributes: []
        }],
        //Makes sure the result is divided based on teamId
        group: ['Team.teamId'],
    }).then((teamsWithMemberCounts) => {
        resolve(
            //Using map to return array of objects that INCLUDES memberCount, so typescript can see it
            teamsWithMemberCounts.map(result => ({
                ...result.dataValues
            }))
        );
    }).catch((error) => {
        console.error('Error fetching team member counts:', error);
        reject(error);
    })
});


/*export const getAllTeams = () => new Promise((resolve, reject) => {
    const sql = `SELECT team.teamId, team.teamName, COUNT(users.userId) as memberCount FROM team LEFT JOIN users ON team.teamId = users.teamId GROUP BY team.teamId, team.teamName`;
    kubeDB.query(sql, (error, result) => {
        if (error) {
            console.error("Error fetching all teams", error);
            reject("Failed to fetch all teams");
        } else {
            resolve(result);
        }
    });
});*/

export const getTeamById = (id: number): Promise<CountedTeam> => new Promise((resolve, reject) => {
    if (!id) {
        reject("ID is required");
        return;
    }
    Team.findOne({
        where: {teamId: id},
        attributes: [
            'teamId',
            'teamName',
            //Counts amount of userId
            [Sequelize.fn('COUNT', Sequelize.col('users.userId')), 'memberCount']
        ],
        //Makes relation between user and team and makes it possible to count users in team
        include: [{
            model: User,
            attributes: []
        }],
        //Makes sure the result is divided based on teamId
        group: ['Team.teamId'],
    }).then((result) => {
        //@ts-ignore
        resolve(result.dataValues)
    }).catch((error) => {
        console.error('Error fetching team member counts:', error);
        reject(error);
    })
});

/*export const getTeamById = (id) => new Promise((resolve, reject) => {
    if (!id) {
        reject("ID is required");
        return;
    }
    const sql = `SELECT team.teamId, team.teamName, COUNT(users.userId) as memberCount
                 FROM team
                          LEFT JOIN users ON team.teamId = users.teamId
                 WHERE team.teamId = ?
                 GROUP BY team.teamId, team.teamName`;
    kubeDB.query(sql, [id], (error, result) => {
        if (error) {
            console.error(`Error fetching team with ID ${id}:`, error);
            reject("Failed to get team by Id");
        } else {
            // @ts-ignore
            if (result.length === 0) {
                reject(`No team found with ID ${id}`);
            } else {
                resolve(result);
            }
        }
    });
});*/

export const getOrCreateTeam = (teamName: string): Promise<BaseTeam["teamId"]> => new Promise(
    (resolve, reject) => {
        Team.findOrCreate({
            where: {teamName: teamName},
            defaults: {teamName: teamName},
            raw: true
        }).then((result) => {
            resolve(result[0].teamId)
        }).catch((error) => {
            reject(error);
        })
    });

/*export const getOrCreateTeam = async (teamName) => {
    try {
        const [rows] = await kubeDB.promise().query('SELECT teamId FROM team WHERE teamName = ?', [teamName]);

        // @ts-ignore
        if (rows.length > 0) {
            return rows[0].teamId;
        }
        const [result] = await kubeDB.promise().query('INSERT INTO team (teamName) VALUES (?)', [teamName]);
        // @ts-ignore
        return result.insertId;
    } catch (err) {
        console.error('Error in getOrCreateTeam:', err);
        throw err;
    }
};*/

export const deleteTeamByID = (id: number) => new Promise(async (resolve, reject) => {
    try {
        await minDB.transaction(async deleteTeamTransaction => {
            const userIdList = await User.findAll({
                where: {teamId: id},
                attributes: ["userId"],
                raw: true
            }).then((result) => {
                return result.map((user) => user.userId)
            })

            await Project.destroy({
                where: {userId: userIdList},
                transaction: deleteTeamTransaction
            })

            await User.destroy({
                where: {userId: userIdList},
                transaction: deleteTeamTransaction
            });

            await Team.destroy({
                where: {teamId: id},
                transaction: deleteTeamTransaction
            })
        });
        resolve(true);
    } catch (error) {
        reject(error);
    }
});

/*export const deleteTeamByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query('DELETE FROM project WHERE userId IN (SELECT userId FROM users WHERE teamId = ?)', [id], (error) => {
        if (error) {
            reject("Error deleting team projects");
            return;
        }

        kubeDB.query('DELETE FROM users WHERE teamId = ?', [id], (error) => {
            if (error) {
                reject("Error deleting team users");
                return;
            }

            kubeDB.query('DELETE FROM team WHERE teamId = ?', [id], (error, result) => {
                if (error) {
                    reject("Team delete by Id error");
                } else {
                    // @ts-ignore
                    if (result.affectedRows === 0) {
                        reject(`Team with id ${id} does not exist`);
                    } else {
                        resolve(result)
                    }
                }
            });
        });
    });
});*/


/*
export const getAllTeamsSortedDesc = () => new Promise((resolve, reject) => {
    const sql = `SELECT team.teamId, team.teamName, COUNT(users.userId) as memberCount
                 FROM team
                          LEFT JOIN users ON team.teamId = users.teamId
                 GROUP BY team.teamId, team.teamName
                 ORDER BY teamName DESC`;
    kubeDB.query(sql, (error, result) => {
        if (error) {
            console.error("Error getting sorted teams", error);
            reject("Failed to doing sorted teams");
        } else {
            resolve(result);
        }
    });
});*/
