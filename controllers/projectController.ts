import {
    getAllProjects,
    getProjectByID,
    createProject,
    deleteProjectByID,
    getAllProjectsByUserID,
    setProjectStatusById,
    getProjectsBySubdomain
} from "../models/projectModel";
import Portainer from "../Portainer"
import {getTemplateByID} from "../models/templateModel";
import {NewProjectBody, ProjectState, UserObject} from "../types/project";
import {Request, Response} from "express";
import {portainerIncluded} from "../constants";

export const projectController = {
    getAll: async (req: Request, res: Response) => {
        const user = res.locals.user as UserObject;
        console.log(res.locals)

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
    /*getByID: async (req: Request, res: Response) => {
        try {
            const project = await getProjectByID(req.params.id)
            res.json(project)
        } catch (error) {
            res.status(500).send(error);
        }
    },*/
    create: async (req: Request, res: Response) => {
        const {templateId, projectName, subdomainName} = req.body as NewProjectBody;

        const templateIdNum = parseInt(templateId)

        if (Number.isNaN(templateIdNum)) {
            res.status(400).send("template id not a number")
            return
        }

        if (projectName.length === 0) {
            res.status(400).send("no project name")
            return
        }

        if (subdomainName.length === 0) {
            res.status(400).send("no subdomain name")
            return
        }

        if (subdomainName.indexOf(' ') !== -1) {
            res.status(400).send("subdomain must not contain spaces")
            return
        }

        const subdomainList = await getProjectsBySubdomain(subdomainName)
        if (subdomainList.length >= 1) {
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

            let newStack;
            if (portainerIncluded) {
                // Name cannot contain space, special character or be capitalized
                newStack = await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, {
                    "fromAppTemplate": false,
                    "name": `${subdomainName}`,
                    "stackFileContent": templateText,
                    "swarmID": swarmId
                }).then((stack) => stack).catch(() => null);
            } else {
                // For when portainer is not included
                newStack = {
                    data: {
                        Id: 12321,
                    }
                }
            }

            if (!newStack) {
                res.status(500).send('Could not create stack in Portainer');
                return;
            }

            // Create new project in sql db
            const stackId = newStack.data.Id;
            const userId = (res.locals.user as UserObject).userId;
            const createdProjectId = await createProject({
                templateId: templateIdNum,
                userId: userId,
                stackId: stackId,
                projectName: projectName,
                subdomainName: subdomainName
            });

            const createdProject = await getProjectByID(createdProjectId);

            res.status(200).json(createdProject);
        } catch (error) {
            console.log('Error creating project')
            res.status(500).send(error);
        }
    },
    delete: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        try {
            const dbProject = await getProjectByID(id);
            const stackId = dbProject.stackId;

            if (portainerIncluded) {
                const deletedStack = await Portainer.delete(`/stacks/${stackId}?endpointId=5`)
                if (!deletedStack) {
                    res.status(500).send('Could not delete stack in Portainer');
                    return;
                }
            }

            await deleteProjectByID(id);

            res.sendStatus(200)
        } catch (error) {
            res.status(500).send(error)
        }


    },
    startProject: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }


        const {stackId} = await getProjectByID(id);

        if (portainerIncluded) {
            const start = await Portainer.post(`/stacks/${stackId}/start?endpointId=5`)
            if (!start) {
                res.status(500).send('Could not start stack in Portainer');
                return;
            }
        }
        await setProjectStatusById({projectId: id, state: ProjectState.on})
        res.status(200).send(`Started project with id ${id}`)
    },
    stopProject: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        const {stackId} = await getProjectByID(id);

        if (portainerIncluded) {
            const stop = await Portainer.post(`/stacks/${stackId}/stop?endpointId=5`)
            if (!stop) {
                res.status(500).send('Could not stop stack in Portainer');
                return;
            }
        }
        await setProjectStatusById({projectId: id, state: ProjectState.off})

        res.status(200).send(`Stopped project with id ${id}`)
    },
    restartProject: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            res.status(400).send("id not a number")
            return
        }

        try {
            //@ts-ignore
            const {stackId, state} = await getProjectByID(id);

            if (state === ProjectState.on) {
                // if it is running, stop it first
                if (portainerIncluded) {
                    await Portainer.post(`/stacks/${stackId}/stop?endpointId=5`)
                }
                await setProjectStatusById({projectId: id, state: ProjectState.off})
            }

            // start it
            if (portainerIncluded) {
                await Portainer.post(`/stacks/${stackId}/start?endpointId=5`)
            }
            await setProjectStatusById({projectId: id, state: ProjectState.on})
        } catch (e) {
            res.status(500).send('Could not restart project');
            return;
        }

        res.sendStatus(200);
    },

};


