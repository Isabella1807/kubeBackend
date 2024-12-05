import kubeDB from "../Database.js"; // get the connection for the database


export const getAllTeams = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM team', (error, result) => {
        if(error){
            console.error("Error fetching all teams", error);
            reject("Failed to fetch all teams");
        }else{
            resolve(result);
        }
    })
});

// get by id
export const getTeamById = (id) => new Promise((resolve, reject) => {
    if(!id) {
        reject("ID is required");
        return;
    }

    kubeDB.query('SELECT * FROM team WHERE teamId = ?', [id], (error, result) => {
        if (error) {
            console.error(`Error fetching team with ID ${id}:`, error);
            reject("Failed to get team by Id");
        } else {
            if (result.length === 0) {
                reject(`No team found with ID ${id}`);
            } else {
                resolve(result);
            }
        }
    });
});

// check if there is a team if not create a new team 
const getOrCreateTeam = async (teamName) => {
    const teamResult = await queryDB('SELECT teamId FROM team WHERE teamName =?', [teamName]);
    if (teamResult.length > 0) {
        return teamResult[0].teamId;
    }
    const newTeam = await queryDB('INSERT INTO team (teamName) VALUES (?)', [teamName]);
    return newTeam.insertId; 
};

export { getOrCreateTeam };

export const deleteTeamByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`DELETE FROM team WHERE teamId = ${id}`, (error, result) => {
        if (error) {
            reject("Team delete by Id error");
        } else {
            if (result.affectedRows === 0) {
                reject(`Team with id ${id} does not exist`);
            } else {
                resolve(result)
            }
        }
    })
})