import { getAllTemplate, getTemplateByID, createTemplate, deleteTemplate, updateTemplate } from "../models/templateModel.js";

export const showAllTemplate = {
    getAll: async (req, res) => {
        try {
            const templates = await getAllTemplate();  // Hent data fra modellen
            res.json(templates);  // Returnér data som JSON
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
                const { templateText, templateName } = req.body;  // Data fra klienten
                const result = await createTemplate({ templateText, templateName });
                res.status(201).json({ message: "Template created", id: result.insertId });
            } catch (error) {
                console.error("Error creating template:", error);
                res.status(500).send("Failed to create template");
            }
        },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await deleteTemplate(id);
            res.status(200).json({ message: "Template deleted", result });
        } catch (error) {
            console.error("Error deleting template:", error);
            res.status(500).send("Failed to delete template");
        }
    },    

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = await updateTemplate(id, data);
            res.status(200).json({ message: "Template updated", result });
        } catch (error) {
            console.error("Error updating template:", error);
            res.status(500).send("Failed to update template");
        }
    },    
};
