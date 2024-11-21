import {getAllProjects} from "../models/projectModel.js";


export const projectController = {
    getAll: async (req, res) => {
        try{
            const projects = await getAllProjects()
            res.json(projects)
        } catch (error) {
            res.sendStatus(500);
        }
    }
}