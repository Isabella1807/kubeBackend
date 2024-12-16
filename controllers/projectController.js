import {
    getAllProjects,
    getProjectByID,
    createProject,
    deleteProjectByID,
    getAllProjectsByUserID,
    setProjectStatusById,
    getProjectBySubdomain
} from "../models/projectModel.js";
import Portainer from "../Portainer.js"
import {getTemplateByID} from "../models/templateModel.js";

const ProjectState = {
    on: 1,
    off: 0
}

export const projectController = {
    getAll: async (req, res) => {
        const user = res.locals.user;

        try {

            if (user.role.isFaculty || user.role.isAdmin) {
                const projects = await getAllProjects();
                res.json(projects);
                return
            }

            const studentProjects = await getAllProjectsByUserID(user.userId);
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

        const subdomainList = await getProjectBySubdomain(subdomainName)
        console.log(subdomainList)
        if (subdomainList.length >= 1){
            res.status(400).send("subdomain name already exists")
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
            const newStack = await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, {
                "fromAppTemplate": false,
                "name": `${subdomainName}`,
                "stackFileContent": templateText,
                "swarmID": swarmId
            }).then((stack) => stack).catch(() => null);

            // temporary for when portainer goes down
            /*const newStack = {
                data: {
                    Id: 12321,
                }
            }*/

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
            console.log('Error creating project')
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

            const deletedStack = await Portainer.delete(`/stacks/${stackId}?endpointId=5`)
            if (!deletedStack) {
                res.status(500).send('Could not delete stack in Portainer');
                return;
            }

            //For when portaioner goes down
           /* if (stackId !== 12321) {
                res.status(418).send('Can only delete dummy projects until portainer works!')
                return;
            }*/

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

        const {stackId} = await getProjectByID(id);

        const start = await Portainer.post(`/stacks/${stackId}/start?endpointId=5`)
        if (!start) {
            res.status(500).send('Could not delete stack in Portainer');
            return;
        }
        await setProjectStatusById(id, ProjectState.on)
        res.status(200).send(`START PROJEKT OG ${id}`)
    },
    stopProject: async (req, res) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        const {stackId} = await getProjectByID(id);

        const stop = await Portainer.post(`/stacks/${stackId}/stop?endpointId=5`)
        if (!stop) {
            res.status(500).send('Could not delete stack in Portainer');
            return;
        }
        await setProjectStatusById(id, ProjectState.off)

        res.status(200).send(`STOP PROJEKT OG ${id}`)
    },
    restartProject: async (req, res) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        try {
            const {stackId, state} = await getProjectByID(id);

            if (state === ProjectState.on) {
                // if it is running, stop it first
                await Portainer.post(`/stacks/${stackId}/stop?endpointId=5`)
                await setProjectStatusById(id, ProjectState.off)
            }

            // start it
            await Portainer.post(`/stacks/${stackId}/start?endpointId=5`)
            await setProjectStatusById(id, ProjectState.on)
        } catch(e) {
            res.status(500).send('Could not restart project');
            return;
        }

        res.sendStatus(200);
    },
    
};


