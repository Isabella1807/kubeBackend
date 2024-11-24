// import kubeDB from "../Database.js";


// export const getAllProjects = () => new Promise((resolve, reject) => {
//     kubeDB.query('SELECT * FROM project', (error, result) => {
//         if (error) {
//             reject("Model get all error")
//         } else {
//             resolve(result)
//         }
//     })
// })

// export const getProjectByID = (id) => new Promise((resolve, reject) => {
//     if (!id) reject();

//     kubeDB.query(`SELECT * FROM project WHERE projectId = ${id}`, (error, result) => {
//         if (error) {
//             reject("Model get by ID error");
//         } else {
//             if (result.length === 0) {
//                 reject(`No project with ID ${id}`);
//             } else {
//                 resolve(result);
//             }
//         }
//     })
// })

// export const createProject = (templateid, userid, projectname, subdomainname) => new Promise((resolve, reject) => {
//     kubeDB.query(`INSERT INTO project (templateId, userId, projectName, subdomainName) VALUES (${templateid}, ${userid}, "${projectname}", "${subdomainname}")`, (error, result) => {
//         if (error) {
//             reject(error);
//         } else {
//             resolve(result);
//         }
//     })
// })

// export const deleteProjectByID = (id) => new Promise((resolve, reject) => {
//     if (!id) reject();

//     kubeDB.query(`DELETE FROM project WHERE projectId = ${id}`, (error, result) => {
//         if (error) {
//             reject("Model delete by ID error");
//         } else {
//             if (result.affectedRows === 0) {
//                 reject(`Project with id ${id} does not exist`);
//             } else {
//                 resolve(result)
//             }
//         }
//     })
// })
