import {getAllTemplate, getTemplateByID} from "../models/templateModel.js";

export const templateController = {
    getAll: async (req, res) => {
        try {
            const template = await getAllTemplate()
            res.json(template)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getByID: async (req, res) => {
        try {
            const template = await getTemplateByID(req.params.id)
            res.json(template)
        } catch (error) {
            res.status(500).send(error);
        }
    }

}