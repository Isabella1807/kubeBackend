import kubeDB from "../Database.js";


export const getAllProjects = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM project', (error, result) => {
        if (error) {
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

export const createProject = (templateid, userid, projectname, subdomainname) => new Promise((resolve, reject) => {

    //hvordan opretter jeg en ny stack, hvad er den der yaml fil, hvad skal sendes med når jeg opretter en ny stack..
    //hvornår udløber token og hvordan ved vi den er udløbet 8 timer
    //Yaml filen skal ændres PR ny stack! Så changeme01 og changeme02 skal ændres til noget UNIKT pr stack.
    //CHANGEME01 og CHANGEME02 skal nok starte med et ord, fordi url's ikke må starte med et tal..

    kubeDB.query(`INSERT INTO project (templateId, userId, projectName, subdomainName) VALUES (${templateid}, ${userid}, "${projectname}", "${subdomainname}")`, (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);
        }
    })
})

export const deleteProjectByID = (id) => new Promise((resolve, reject) => {
    if (!id) reject();

    kubeDB.query(`DELETE FROM project WHERE projectId = ${id}`, (error, result) => {
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
})
