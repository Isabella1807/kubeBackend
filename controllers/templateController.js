import { getAllTemplate } from "../models/templateModel.js";

export const showAllTemplate = {
    getAll: async (req, res) => {
        try {
            const templates = await getAllTemplate();
            res.json(templates);
        } catch (error) {
            console.error("Error fetching templates:", error);
            res.status(500).send("Failed to fetch templates");
        }
    },

    getByID: async (req, res) => {
        try {
            const id = req.params.id;
            const template = await getTemplateByID(id);
            res.json(template);
        } catch (error) {
            console.error(`Error fetching template with ID:`, error);
            res.status(500).send(error);
        }
    },

    create: async (req, res) => {
        try {
            const { name, description } = req.body;  // Data fra klienten
            const result = await createTemplate({ name, description });
            res.status(201).json({ message: "Template created", id: result.insertId });
        } catch (error) {
            console.error("Error creating template:", error);
            res.status(500).send("Failed to create template");
        }
    },

    delete: async (req, res) => {
        res.status(501).send("Delete functionality not implemented");
    },
};
