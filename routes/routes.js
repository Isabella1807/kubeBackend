import express from "express";
import {showAllRoles} from "../controllers/roleController.js";
import projectRoutes from "./projectRoutes.js";
import userRoutes from "./userRoutes.js";
import templateRoutes from "./templateRoutes.js";
import teamRoutes from "./teamRoutes.js";
import kubeDB from "../Database.js";

const router = express.Router();

router.post('/api/projects', async (req, res) => {
        const { projectName, subdomainName, selectedTemplate, stackId, userId } = req.body;
        const createdDate = new Date();  // Gem den aktuelle dato som createdDate
        const LastChangeDate = new Date();  // Brug samme dato som LastChangeDate
    
        try {
            // Indsæt det nye projekt i databasen
            const [result] = await kubeDB.execute(
                'INSERT INTO project (projectName, subdomainName, templateId, createdDate, LastChangeDate, stackId, userId) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [projectName, subdomainName, selectedTemplate, createdDate, LastChangeDate, stackId, userId]
            );
    
            // Returner det oprettede projekt som JSON
            res.status(201).json({
                projectId: result.insertId,
                projectName,
                subdomainName,
                selectedTemplate,
                createdDate,
                LastChangeDate,
                stackId,
                userId
            });
        } catch (err) {
            console.error("Database error:", err.message);
            res.status(500).json({ message: 'Fejl ved oprettelse af projekt' });
        }
    });


router.use("/roles", showAllRoles);
router.use("/templates", templateRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use((req, res) => {res.status(404).send("route not found")})

export default router;
