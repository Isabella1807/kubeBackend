import { getAllTemplates } from "../models/templateModel.js"; // fortæller hvor den skal hente templates fra

export const templateController = {
  // Gør brug af Async metoder, til de forskellige kald.

  getAll: async (req, res) => { // henter alle templates
    try {
      const template = await getAllTemplates(); // Kald til funktion for at hente templates
      res.json(template); // Returner response som json.
    } catch (error) {
      res.status(500).send(error); // send error ved fejl
    }
  },
  getByID: async (req, res) => { // henter en specifik template med Id
    try {
      const template = await getTemplateByID(req.params.id); //fortæller hvad Id'et skal være
      res.json(template); // Returner respons som json.
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch template", error }); // send besked ved fejl
    }
  },
  create: async (req, res) => {
    // Din logik for at oprette en template
  },
  delete: async (req, res) => {
    // Din logik for at slette en template
  },
};
