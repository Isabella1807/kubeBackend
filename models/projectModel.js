import kubeDB from "../Database.js";


export const getAllProjects = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM project', (error, result) => {
        if(error){
            reject("Model get all error")
        } else {
            resolve(result)
        }
    })
})

export const getProjectByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT * FROM project WHERE projectId = ${id}`, (error, result) => {
        if (error) {
            reject("Model get by ID error")
        } else {
            if(result.length === 0){
                reject(`No project with ID ${id}`)
            } else {
                resolve(result)
            }
        }
    })
})

/*
export const getProductByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT * FROM products WHERE productID = ${id}`, (err, results) => {
        if (err) {
            reject(err);
        } else {
            if (results[0]) {
                resolve(results[0]);
            } else {
                reject();
            }
        }
    })
});

*/

/*
export const createProject
export const getAllProjects
export const getProjectByID = (id) =>
}
export const updateProjectByID
export const deleteProjectByID

*/