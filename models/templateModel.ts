import kubeDB from "../Database";
import {BaseTemplate} from "../types/template";
import Template from "../database/models/Template";

// Funktion for at hente alle templates
export const getAllTemplates = (): Promise<BaseTemplate[]> => new Promise((resolve, reject) => {
    Template.findAll({
        raw: true,
    }).then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    })
});

/*export const getAllTemplates = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM template', (error, result) => {
        if (error) {
            console.error("Error fetching all templates:", error);  // Log fejlen for debugging
            reject(error);
        } else {
            resolve(result);
        }
    });
});*/

// Funktion for at hente template by ID
export const getTemplateByID = (id: number): Promise<BaseTemplate> => new Promise((resolve, reject) => {
    if (!id) {
        reject("ID is required");  // Returner en fejl, hvis ID ikke er angivet
        return;
    }

    Template.findOne({
        where: {templateId: id},
        raw: true
    }).then((result) => {
        if (result) {
            resolve(result as BaseTemplate);
        } else {
            reject("Template not found");
        }
    }).catch((err) => {
        reject(err);
    })
});
/*export const getTemplateByID = (id: number): Promise<BaseTemplate> => new Promise((resolve, reject) => {
    if (!id) {
        reject("ID is required");  // Returner en fejl, hvis ID ikke er angivet
        return;
    }

    // Brug parameteriseret forespørgsel for at undgå SQL-injektion
    kubeDB.query('SELECT * FROM template WHERE templateId = ?', [id], (error, result) => {
        if (error) {
            console.error(`Error fetching template with ID ${id}:`, error);  // Log fejlen for debugging
            reject("Model get by ID error");
        } else {
            // @ts-ignore
            if (result.length === 0) {
                reject(`No template found with ID ${id}`);
            } else {
                console.log(result[0])
                resolve(result[0]);
            }
        }
    });
});*/

export const createTemplate = (templateName: string, templateText: string) => new Promise((resolve, reject) => {
    Template.create({
        templateName: templateName,
        templateText: templateText
    }).then((result) => {
        resolve(result)
    }).catch((err) => {
        reject(err)
    })
});

/*export const createTemplate = async (templateName, templateText) => {
    return new Promise((resolve, reject) => {
        kubeDB.query(
            'INSERT INTO template (templateName, templateText) VALUES (?, ?)',
            [templateName, templateText],
            (err, result) => {
                if (err) reject(err);
                // @ts-ignore
                else resolve(result.insertId);
            }
        );
    });
};*/


/*export const deleteTemplateById = async (id: number): Promise<number> => {
    if (!id) {
        throw new Error("ID is required");
    }

    const result = await Template.destroy({where: {templateId: id}});

    if (result === 0) {
        throw new Error("Template not found");
    }

    return result;
};*/

export const deleteTemplateById = (id: number): Promise<number> => new Promise((resolve, reject) => {
    if (!id) {
        reject("ID is required");  // Returner en fejl, hvis ID ikke er angivet
        return;
    }

    Template.destroy({
        where: {templateId: id},
    }).then((result) => {
        if (result) {
            resolve(result);
        } else {
            reject("Template not found");
        }
    }).catch((err) => {
        reject(err)
    })
});

/*export const deleteTemplateById = (id) => new Promise((resolve, reject) => {
    const query = 'DELETE FROM template WHERE templateId = ?';
  
    kubeDB.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting template:", err); // Log fejl
        reject(new Error("Database error"));
          // @ts-ignore
      } else if (result.affectedRows === 0) {
        resolve({ success: false }); 
      } else {
        resolve({ success: true }); // Template blev slettet
      }
    });
  });*/


export const updateTemplateById = (id: number, templateName: string, templateText: string): Promise<number> =>  new Promise((resolve, reject) => {
    Template.update(
        {
            templateName: templateName,
            templateText: templateText,
        },
        {
            where: {templateId: id},
        }
    ).then((result) => {
        resolve(result[0]);
    }).catch((err) => {
        reject(err);
    })
});
/*export const updateTemplateById = (id, templateName, templateText) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE template SET templateName = ?, templateText = ? WHERE templateId = ?';
    kubeDB.query(query, [templateName, templateText, id], (err, result) => {
      if (err) {
        console.error("Error updating template:", err); // Log fejl
        reject(err);
      } else {
        resolve(result); // Returnér resultatet
      }
    });
  });
};*/
  
  
