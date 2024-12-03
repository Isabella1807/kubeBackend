import express from "express"; // Behold kun importen
import { showAllRoles } from "../controllers/roleController.js";
import projectRoutes from "./projectRoutes.js";
import userRoutes from "./userRoutes.js";
import templateRoutes from "./templateRoutes.js";

const router = express.Router();

router.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

router.get('/api/projects', (req, res) => {
    connection.query('SELECT * FROM project', (err, rows) => {
      if (err) {
        // Hvis der opstår fejl ved forespørgslen
        console.error('Fejl ved hentning af projekter:', err.message);
        return res.status(500).json({ 
          error: 'Noget gik galt ved hentning af projekter', 
          details: err.message 
        });
      }
      // Hvis forespørgslen lykkes, returner resultaterne som JSON
      res.json(rows);
    });
  });

router.get("/roles", showAllRoles);
router.use("/template", templateRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);


// Tilføj flere ruter efter behov
router.use((req, res) => {
    res.status(404).send("route not found");
});

export default router; // Brug export default i stedet for module.exports
