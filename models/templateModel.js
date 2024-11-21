import kubeDB from "../Database.js";


export const getAllTemplate = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM template', (error, result) => {
        if (error) {
            reject("Model get all error")
        } else {
            resolve(result)
        }
    })
})

export const getTemplateByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`SELECT * FROM template WHERE templateId = ${id}`, (error, result) => {
        if (error) {
            reject("Model get by ID error");
        } else {
            if (result.length === 0) {
                reject(`No project with ID ${id}`);
            } else {
                resolve(result);
            }
        }
    })
})
