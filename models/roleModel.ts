import kubeDB from "../Database";

//@ts-ignore
export const getAllRoles = (result) => {
    kubeDB.query("SELECT * FROM role", (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    });
};