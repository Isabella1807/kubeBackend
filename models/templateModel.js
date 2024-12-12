import kubeDB from "../Database.js";
import yaml from "js-yaml";

// Funktion for at hente alle templates
export const getAllTemplates = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM template', (error, result) => {
        if (error) {
            console.error("Error fetching all templates:", error);  // Log fejlen for debugging
            reject(error);
        } else {
            resolve(result);
        }
    });
});

// Funktion for at hente template by ID
export const getTemplateByID = (id) => new Promise((resolve, reject) => {
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
            if (result.length === 0) {
                reject(`No template found with ID ${id}`);
            } else {
                resolve(result[0]);
            }
        }
    });
});


export const createTemplate = async (templateName, templateText) => {
    return new Promise((resolve, reject) => {
        kubeDB.query(
            'INSERT INTO template (templateName, templateText) VALUES (?, ?)',
            [templateName, templateText],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
};

// SLETTER

// Funktion til at slette template ved ID
export const deleteTemplateById = (id) => new Promise((resolve, reject) => {
    const query = 'DELETE FROM template WHERE templateId = ?';
  
    kubeDB.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting template:", err); // Log fejl
        reject(new Error("Database error"));
      } else if (result.affectedRows === 0) {
        resolve({ success: false }); // Returnér et flag for, at template ikke blev fundet
      } else {
        resolve({ success: true }); // Template blev slettet
      }
    });
  });
  
