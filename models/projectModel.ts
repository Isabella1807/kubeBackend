import kubeDB from "../Database";
import {models, seqDB} from "../SeqDB";
import {BaseProject, ProjectWithStackId, ResultSetHeader} from "../types/project";

export const getAllProjects = async () => {
    return await models.project.findAll({
        include: [
            { model: models.users, as: "user" },
            { model: models.template, as: "template" }
        ]
    });
};
/*export const getAllProjects = (): Promise<BaseProject[]> => new Promise((resolve, reject) => {
    kubeDB.query('SELECT projectId, templateId, project.userId AS userId, projectName, createdDate, subdomainName, lastChangeDate, uclMail, firstName, lastName, teamName, state FROM project LEFT JOIN users ON project.userId = users.userId LEFT JOIN team ON users.teamId = team.teamId;', (error, result) => {
        if (error) {
            reject("Model get all error")
        } else {
            resolve(result as BaseProject[])
        }
    })
})*/

export const getAllProjectsByUserID = (id: number): Promise<BaseProject[]> => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT projectId, templateId, project.userId AS userId, projectName, createdDate, subdomainName, lastChangeDate, uclMail, firstName, lastName, teamName, state FROM project LEFT JOIN users ON project.userId = users.userId LEFT JOIN team ON users.teamId = team.teamId WHERE project.userId = ?`, [id], (error, result) => {
        if (error) {
            reject("Model get by ID error");
        } else {
            resolve(result as BaseProject[])
        }
    })
})

export const getProjectByID = (id: number): Promise<ProjectWithStackId> => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT projectId, templateId, project.userId AS userId, stackId, projectName, createdDate, subdomainName, lastChangeDate, uclMail, firstName, lastName, teamName, state FROM project LEFT JOIN users ON project.userId = users.userId LEFT JOIN team ON users.teamId = team.teamId WHERE project.projectId = ?`, [id], (error, result) => {
        if (error) {
            reject("Model get by ID error");
        } else {
            // @ts-ignore
            if (result.length === 0) {
                reject(`No project with ID ${id}`);
            } else {
                resolve(result[0]);
            }
        }
    })
})

export const createProject = (templateid: number, userid: number, stackId: number, projectname: string, subdomainname: string): Promise<ResultSetHeader> => new Promise((resolve, reject) => {
    const query = `INSERT INTO project (templateId, userId, stackId, projectName, subdomainName, state) VALUES (?, ?, ?, ?, ?, 1)`;
    const values = [templateid, userid, stackId, projectname, subdomainname];

    kubeDB.query(query, values, (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result as ResultSetHeader);

        }
    });
});

export const deleteProjectByID = (id:number): Promise<ResultSetHeader> => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`DELETE FROM project WHERE projectId = ?`, [id], (error, result) => {
        if (error) {
            reject("Model delete by ID error");
        } else {
            if ((result as ResultSetHeader).affectedRows === 0) {
                reject(`Project with id ${id} does not exist`);
            } else {
                resolve(result as ResultSetHeader)
            }
        }
    })
});


export const setProjectStatusById = (id: number, status: number): Promise<any> => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`UPDATE project SET state = ? WHERE projectId = ?`, [status, id], (error, result) => {
        if (error) {
            reject("error");
        } else {
            console.log(result)
            resolve("success");
        }
    })
})

export const getProjectBySubdomain = (name: string): Promise<BaseProject[]> => new Promise((resolve, reject) => {
    if (!name) reject();
    kubeDB.query(`SELECT subdomainName project FROM project WHERE subdomainName = ?`, [name], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result as BaseProject[]);
        }
    })
})
