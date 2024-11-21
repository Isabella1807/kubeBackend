import kubeDB from "../Database.js";


export const getAllProjects = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM project', (error, results) => {
        if(error){
            reject("Model fejl")
        } else {
            resolve(results)
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