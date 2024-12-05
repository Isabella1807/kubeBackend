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
export const getOrCreateTeam = async (teamName) => {
    try {
        // Use array destructuring to get the rows directly
        const [rows] = await kubeDB.promise().query('SELECT teamId FROM team WHERE teamName = ?', [teamName]);

        if (rows.length > 0) {
            return rows[0].teamId;
        }

        // For INSERT, we also need to destructure
        const [result] = await kubeDB.promise().query('INSERT INTO team (teamName) VALUES (?)', [teamName]);
        return result.insertId;
    } catch (err) {
        console.error('Error in getOrCreateTeam:', err);
        throw err;
    }
};

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