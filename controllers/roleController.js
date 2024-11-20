import {getAllRoles} from "../models/roleModel.js";

export const showAllRoles = (req, res) => {
    getAllRoles((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};