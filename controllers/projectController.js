import {
    getAllProjects,
    getProjectByID,
    createProject,
    deleteProjectByID,
    getAllProjectsByUserID
} from "../models/projectModel.js";
import Portainer from "../Portainer.js"
import {getTemplateByID} from "../models/templateModel.js";


export const projectController = {
    getAll: async (req, res) => {
        try {

            if (res.locals.user.role.isFaculty || res.locals.user.role.isAdmin) {
                const projects = await getAllProjects();
                res.json(projects);
                return
            }

            const studentProjects = await getAllProjectsByUserID(res.locals.user.userId);
            res.json(studentProjects);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    getByID: async (req, res) => {
        try {
            const project = await getProjectByID(req.params.id)
            res.json(project)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    create: async (req, res) => {
        const {templateId, projectName, subdomainName} = req.body;

        const templateIdNum = parseInt(templateId)

        if (Number.isNaN(templateIdNum)) {
            res.status(400).send("template id not a number")
            return
        }

        if (typeof projectName !== 'string' || projectName.length === 0) {
            res.status(400).send("no project name")
            return
        }

        if (typeof subdomainName !== 'string' || subdomainName.length === 0) {
            res.status(400).send("no subdomain name")
            return
        }

        try {
            // Get template from db using Id
            let templateText = await getTemplateByID(templateIdNum).then((template) => {
                return template['templateText'];
            }).catch(() => {
                return null;
            });
            if (!templateText) {
                res.status(404).send('Template not found');
                return;
            }

            // Values to create stack in portainer
            const subDomainWp = subdomainName;
            const subdomainPma = subdomainName + "-pma";
            const websiteId = Math.random().toString(36).substring(7); //Random string which can contain both numbers and letters
            const pmaId = Math.random().toString(36).substring(7);
            const swarmId = "v1pkdou24tzjtncewxhvpmjms"

            // Using regex to replace values in fileContent, if they are there. 'SUBDOMAIN' and 'CHANGEME' must be AFTER the *01 and *02 replace attempts!
            templateText = templateText
                .replace(/SUBDOMAIN01/g, subDomainWp)
                .replace(/SUBDOMAIN02/g, subdomainPma)
                .replace(/SUBDOMAIN/g, subDomainWp)
                .replace(/CHANGEME01/g, websiteId)
                .replace(/CHANGEME02/g, pmaId)
                .replace(/CHANGEME/g, websiteId)

            // Name cannot contain space, special character or be capitalized
            /*const newStack = await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, {
                "fromAppTemplate": false,
                "name": `${projectName}`,
                "stackFileContent": templateText,
                "swarmID": swarmId
            }).then((stack) => stack).catch(() => null);*/
            /** TEMPORARY HARDCODED STACK UNTIL PORTAINER WORKS **/
            const newStack = {
                data: {
                    Id: 12321,
                }
            }
            /** REMOVE ABOVE WHEN PORTAINER WORKS **/

            if (!newStack) {
                res.status(500).send('Could not create stack in Portainer');
                return;
            }

            // Create new project in sql db
            const stackId = newStack.data.Id;
            const userId = res.locals.user.userId;
            const createdProjectInfo = await createProject(templateId, userId, stackId, projectName, subdomainName);

            const createdProject = await getProjectByID(createdProjectInfo.insertId);

            res.status(200).json(createdProject);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        try {
            const dbProject = await getProjectByID(id);
            const stackId = dbProject.stackId;

            /** TEMPORARY HARDCODED CHECK UNTIL PORTAINER WORKS **/
            /*const deletedStack = await Portainer.delete(`/stacks/${stackId}?endpointId=5`)
            if (!deletedStack) {
                res.status(500).send('Could not delete stack in Portainer');
                return;
            }*/
            
            if (stackId !== 12321) {
                res.status(418).send('Can only delete dummy projects until portainer works!')
                return;
            }

            await deleteProjectByID(id);

            res.sendStatus(200)
        } catch (error) {
            res.status(500).send(error)
        }


    },
    startProject: async (req, res) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        res.status(418).send(`START PROJEKT OG ${id}`)
    },
    stopProject: async (req, res) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        res.status(418).send(`STOP PROJEKT OG ${id}`)
    },
    restartProject: async (req, res) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        res.status(418).send(`RESTART PROJEKT OG ${id}`)
    },
};
