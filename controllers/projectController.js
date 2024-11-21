import {getAllProjects, getProjectByID} from "../models/projectModel.js";


export const projectController = {
    getAll: async (req, res) => {
        try {
            const projects = await getAllProjects()
            res.json(projects)
        } catch (error) {
            res.sendStatus(500);
        }
    },
    getByID: async (req, res) => {
        try {
            const project = await getProjectByID(req.params.id)
            res.json(project)
        } catch (error) {
            res.status(500).send(error);
        }
    }
}