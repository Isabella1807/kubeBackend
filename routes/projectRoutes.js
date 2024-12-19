import express from "express";
import {projectController} from "../controllers/projectController.js";
import {mustBeLoggedIn} from "../middleware/authenticate.js";
import {requirePortainerAuth} from "../middleware/portainerConnection.js";
import {STOP_REQUEST} from "../middleware/temp.js";

const router = express.Router();
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Project API
 *   version: 1.0.0
 *   description: API for managing projects
 * tags:
 *   - name: Projects
 *     description: Everything about projects
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 * paths:
 *   /projects:
 *     get:
 *       tags:
 *         - Projects
 *       summary: Get all projects
 *       description: Requires a Bearer token for authentication.
 *       operationId: getAllProjects
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Success - List of projects
 *         '401':
 *           description: Unauthorized - Missing or invalid token
 *     post:
 *       tags:
 *         - Projects
 *       summary: Create new project
 *       description: If you are logged in, you can create a project.
 *       operationId: createNewProject
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - templateId
 *                 - projectName
 *                 - subdomainName
 *               properties:
 *                 templateId:
 *                   type: integer
 *                   description: The ID of the template you want to use.
 *                   example: "6"
 *                 projectName:
 *                   type: string
 *                   description: The name of your project.
 *                   example: "MyProjectName"
 *                 subdomainName:
 *                   type: string
 *                   description: The name of your subdomain
 *                   example: "MySubdomainName"
 *       responses:
 *         '200':
 *           description: Project created successfully
 *         '401':
 *           description: Unauthorized - Missing or invalid token
 *   /projects/{projectId}:
 *     delete:
 *       tags:
 *         - Projects
 *       summary: Delete project
 *       description: If you are logged in, you can delete a project.
 *       operationId: deleteProject
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project you want to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       responses:
 *         '200':
 *           description: Project deleted successfully
 *         '401':
 *           description: Unauthorized - Missing or invalid token
 *   /projects/start/{projectId}:
 *     post:
 *       tags:
 *         - Projects
 *       summary: Start project
 *       description: If you are logged in, you can start a project.
 *       operationId: startProject
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project you want to start.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       responses:
 *         '200':
 *           description: Project started successfully
 *         '401':
 *           description: Unauthorized - Missing or invalid token
 *   /projects/stop/{projectId}:
 *     post:
 *       tags:
 *         - Projects
 *       summary: Stop project
 *       description: If you are logged in, you can stop a project.
 *       operationId: stopProject
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project you want to stop.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       responses:
 *         '200':
 *           description: Project stopped successfully
 *         '401':
 *           description: Unauthorized - Missing or invalid token
 *   /projects/restart/{projectId}:
 *     post:
 *       tags:
 *         - Projects
 *       summary: Restart project
 *       description: If you are logged in, you can restart a project.
 *       operationId: restartProject
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project you want to restart.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       responses:
 *         '200':
 *           description: Project restarted successfully
 *         '401':
 *           description: Unauthorized - Missing or invalid token
 */
router.get("/", mustBeLoggedIn, requirePortainerAuth, projectController.getAll)
// router.get("/:id", projectController.getByID)
router.post("/", mustBeLoggedIn, requirePortainerAuth, projectController.create)
router.delete("/:id", mustBeLoggedIn, requirePortainerAuth, projectController.delete)
router.post("/start/:id", mustBeLoggedIn, requirePortainerAuth, projectController.startProject)
router.post("/stop/:id", mustBeLoggedIn, requirePortainerAuth, projectController.stopProject)
router.post("/restart/:id", mustBeLoggedIn, requirePortainerAuth, projectController.restartProject)
export default router;
