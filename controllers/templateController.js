import { getAllTemplates, createTemplate } from "../models/templateModel.js";

export const templateController = {
  getAll: async (req, res) => {
    try {
      const template = await getAllTemplates(); // Din logik for at hente templates
      res.json(template);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getByID: async (req, res) => {
    try {
      const template = await getTemplateByID(req.params.id);
      res.json(template);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch template", error });
    }
  },
  create: async (req, res) => {
    try {
      const user = res.locals.user;
      if (!user || user.roleId !== 1) {
        return res.status(403).send("Access denied. Only admins can create templates.");
      }

      const { templateName, templateText } = req.body;

      if (!templateName || !templateText) {
        return res.status(400).send("Template name and text are required.");
      }

      const newTemplateId = await createTemplate(templateName, templateText);
      res.status(201).json({ message: "Template created successfully", templateId: newTemplateId });
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(500).send({ message: "Failed to create template", error });
    }
  },
  delete: async (req, res) => {
    // Din logik for at slette en template
  },
};
