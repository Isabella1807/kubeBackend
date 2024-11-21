import {getAllTemplate} from "../models/templateModel.js";

export const showAllTemplate = {
    getAll: async (req, res) => {
        try {
            const template = await getAllTemplate();  // Din logik for at hente templates
            res.json(template);
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
    },
    create: async (req, res) => {
        // Din logik for at oprette en template
    },
    delete: async (req, res) => {
        // Din logik for at slette en template
    }
};


// export const showAllTemplate= {
//     getAll: async (req, res) => {
//         try {
//             const template = await getAllTemplate()
//             res.json(template)
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     },
//     getByID: async (req, res) => {
//         try {
//             const template = await getTemplateByID(req.params.id)
//             res.json(template)
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     }

// }