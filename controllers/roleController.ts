import {getAllRoles} from "../models/roleModel";

//@ts-ignore
export const showAllRoles = (req, res) => {
    //@ts-ignore
    getAllRoles((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};