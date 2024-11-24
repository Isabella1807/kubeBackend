import kubeDB from "../Database.js";

// Funktion for at hente alle templates
export const getAllTemplate = () => new Promise((resolve, reject) => {
    kubeDB.query('SELECT * FROM template', (error, result) => {
        if (error) {
            console.error("Error fetching all templates:", error);  // Log fejlen for debugging
            reject("Failed to fetch all templates");
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
                resolve(result);
            }
        }
    });
});

//CREATE
export const createTemplate = (data) => new Promise((resolve, reject) => {
    kubeDB.query(
        'INSERT INTO template (templateText, templateName) VALUES (?, ?)',
        [data.templateText, data.templateName],
        (error, result) => {
            if (error) {
                console.error("Error creating template:", error);
                reject(error);
            } else {
                resolve(result);
            }
        }
    );
});

//UPDATE
export const updateTemplate = (id, data) => new Promise((resolve, reject) => {
    kubeDB.query('UPDATE template SET ? WHERE templateId = ?', [data, id], (error, result) => {
        if (error) {
            console.error("Error updating template:", error);
            reject(error);
        } else {
            resolve(result);
        }
    });
});


//DELETE
export const deleteTemplate = (id) => new Promise((resolve, reject) => {
    kubeDB.query('DELETE FROM template WHERE templateId = ?', [id], (error, result) => {
        if (error) {
            console.error("Error deleting template:", error);
            reject(error);
        } else {
            resolve(result);
        }
    });
});



