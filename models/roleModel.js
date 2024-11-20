import kubeDB from "../Database.js";

export const getAllRoles = (result) => {
    kubeDB.query("SELECT * FROM role", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};