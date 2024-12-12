import kubeDB from "../Database.js";


export const getAllProjects = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT projectId, templateId, project.userId AS userId, projectName, createdDate, subdomainName, lastChangeDate, uclMail, firstName, lastName, teamName, state FROM project LEFT JOIN users ON project.userId = users.userId LEFT JOIN team ON users.teamId = team.teamId;', (error, result) => {
        if (error) {
            reject("Model get all error")
        } else {
            resolve(result)
        }
    })
})

export const getAllProjectsByUserID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT projectId, templateId, project.userId AS userId, projectName, createdDate, subdomainName, lastChangeDate, uclMail, firstName, lastName, teamName, state FROM project LEFT JOIN users ON project.userId = users.userId LEFT JOIN team ON users.teamId = team.teamId WHERE project.userId = ?`, [id], (error, result) => {
        if (error) {
            reject("Model get by ID error");
        } else {
            resolve(result)
        }
    })
})

export const getProjectByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT projectId, templateId, project.userId AS userId, stackId, projectName, createdDate, subdomainName, lastChangeDate, uclMail, firstName, lastName, teamName, state FROM project LEFT JOIN users ON project.userId = users.userId LEFT JOIN team ON users.teamId = team.teamId WHERE project.projectId = ?`, [id], (error, result) => {
        if (error) {
            reject("Model get by ID error");
        } else {
            if (result.length === 0) {
                reject(`No project with ID ${id}`);
            } else {
                resolve(result[0]);
            }
        }
    })
})

export const createProject = (templateid, userid, stackId, projectname, subdomainname) => new Promise((resolve, reject) => {
    const query = `INSERT INTO project (templateId, userId, stackId, projectName, subdomainName, state) VALUES (?, ?, ?, ?, ?, 1)`;
    const values = [templateid, userid, stackId, projectname, subdomainname];

    kubeDB.query(query, values, (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);

        }
    });
});

export const deleteProjectByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`DELETE FROM project WHERE projectId = ?`, [id], (error, result) => {
        if (error) {
            reject("Model delete by ID error");
        } else {
            if (result.affectedRows === 0) {
                reject(`Project with id ${id} does not exist`);
            } else {
                resolve(result)
            }
        }
    })
});


export const setProjectStatusById = (id, status) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`UPDATE project SET state = ? WHERE projectId = ?`, [status, id], (error, result) => {
        if (error) {
            reject("error");
        } else {
            resolve("Result");
        }
    })
})