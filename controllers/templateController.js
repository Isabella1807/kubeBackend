import yaml from 'js-yaml';
import { getAllTemplates, createTemplate, deleteTemplateById, getTemplateByID, updateTemplateById} from "../models/templateModel.js";

export const templateController = {
  getAll: async (req, res) => {
    try {
      const template = await getAllTemplates();
      res.json(template);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getByID: async (req, res) => {
    const { id } = req.params;
    try {
      const template = await getTemplateByID(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template); 
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch template", error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { user } = res.locals;
      if (!user || user.roleId !== 1) {
        return res.status(403).send("Access denied. Only admins can create templates.");
      }

      const { templateName, templateText } = req.body;

      /*if (!/\.(yml|yaml)$/i.test(templateName)) {
        return res.status(400).json({
          error: 'Invalid File Type',
          message: 'Template name must end with .yml or .yaml'
        });
      }

      let parsedYaml;
      try {
        parsedYaml = yaml.load(templateText);
        if (!parsedYaml || typeof parsedYaml !== 'object' || !parsedYaml.services || Object.keys(parsedYaml.services).length === 0) {
          throw new Error('Invalid YAML format or services section');
        }

        // Validate services
        const invalidService = Object.entries(parsedYaml.services).find(([_, serviceConfig]) => !serviceConfig.image);
        if (invalidService) {
          return res.status(400).json({
            error: 'Invalid Service Configuration',
            message: 'Each service must have an image defined'
          });
        }
      } catch (yamlError) {
        return res.status(400).json({
          error: 'YAML Parsing Error',
          message: 'Invalid YAML format',
          details: yamlError.message
        });
      }*/

      const newTemplateId = await createTemplate(templateName, templateText);
      res.status(201).json({
        message: "Template created successfully",
        templateId: newTemplateId
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to create template",
        error: error.message
      });
    }
  },

  delete: async (req, res) => {
    const { user } = res.locals;
    if (!user || user.roleId !== 1) {
      return res.status(403).send("Access denied. Only admins can delete templates.");
    }
  
    const templateId = req.params.id;
    try {
      const result = await deleteTemplateById(templateId);
  
      if (!result.success) {
        return res.status(404).json({ message: "Template not found" });
      }
  
      res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete template",
        error: error.message,
      });
    }
  }, 
  update: async (req, res) => {
    const { id } = req.params;
    const { templateName, templateText } = req.body;
    
    try {
      if (!templateName || !templateText) {
        return res.status(400).json({ message: 'Template name and text are required' });
      }

      const result = await updateTemplateById(id, templateName, templateText);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Template updated successfully' });
      } else {
        res.status(404).json({ message: 'Template not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update template', error: error.message });
    }
  },  
};
