import {getAllTemplate} from "../models/teamModel.js";

export const showAllTemplate = (req, res) => {
    getAllTemplate((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};