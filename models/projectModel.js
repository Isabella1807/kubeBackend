import kubeDB from "../Database.js";

/*
export const createProject
export const getAllProjects
export const getProjectByID = (id) =>
}
export const updateProjectByID
export const deleteProjectByID

*/


//METODE 1//
export const getAllProducts = (result) => {
    shopDB.query("SELECT * FROM products", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


//METODE 2//
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

