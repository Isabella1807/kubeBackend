import {getAllProjects, getProjectByID, createProject, deleteProjectByID} from "../models/projectModel.js";
//import axios from "axios";
import dotenv from "dotenv";
import Portainer, {setPortainerToken} from "../Portainer.js"
import axios from "axios";
import {getTemplateByID} from "../models/templateModel.js";

//Makes it possible to use .env variables to hide login data
dotenv.config()

export const projectController = {
    getAll: async (req, res) => {
        try {

            const {data} = await Portainer.post('/auth', {
                username: process.env.PORTAINER_USERNAME,
                password: process.env.PORTAINER_PASSWORD
            })

            //how often does token change?
            const token = data.jwt;

            const stacks = await Portainer.get(`/stacks`, {
                headers: {
                    Authorization: token
                }
            })

            console.log(stacks.data);


            const projects = await getAllProjects()
            res.json(projects)
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

        if (typeof projectName !== 'string' || projectName.length === 0) {
            res.status(400).send("no project name")
            return
        }

        if (typeof subdomainName !== 'string' || subdomainName.length === 0) {
            res.status(400).send("no subdomain name")
            return
        }

        if (typeof templateId !== 'number') {
            res.status(400).send("template id is not a number")
            return
        }

        try {
            const {data} = await Portainer.post('/auth', {
                username: process.env.PORTAINER_USERNAME,
                password: process.env.PORTAINER_PASSWORD
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            //how often does token change?
            const token = data.jwt;

            setPortainerToken(token);

            //FETCH TEMPLATE BY ID OG SÆT TEMPLATE TEXT IND I STACKFILECONTENT
            // OG SÅ TEMPLATEID FRA POSTMAN SKAL HENTES SOM STACKFILECONTENT ISTEDET FOR ID

            //Get template from db using Id
            const {templateText} = await getTemplateByID(templateId);
            let fileContent = templateText;

            //Values to create stack in portainer
            const subDomainWp = subdomainName;
            const subdomainPma = subdomainName + "-pma";
            const websiteId = Math.random().toString(36).substring(7); //Random string which can contain both numbers and letters
            const pmaId = Math.random().toString(36).substring(7);
            const swarmId = "v1pkdou24tzjtncewxhvpmjms"

            // Using regex to replace all in fileContent values
            fileContent = fileContent
                .replace(/SUBDOMAIN01/g, subDomainWp)
                .replace(/SUBDOMAIN02/g, subdomainPma)
                .replace(/CHANGEME01/g, websiteId)
                .replace(/CHANGEME02/g, pmaId);

            // name cannot have a space, contain special character or be capitalized
            const newStack = await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, {
                "fromAppTemplate": false,
                "name": `${projectName}`,
                "stackFileContent": fileContent,
                "swarmID": swarmId
            });

            //
            const stackId = newStack.data.Id;
            const userId = res.locals.user.userId;
            await createProject(templateId, userId, stackId, projectName, subdomainName);


            /*
            opret eget project når portainer stack er oprettet
            - brug stack id fra newStack
            - brug user id fra res.locals.user

            slet portainer stacken først, og så projectet i egen db ved delete project request
            - requested tager id på projectet i egen db - find derfra ud af hvilket stack id den hænger sammen med - slet stacked i portainer, og så slet eget project

            i get all projects request - hvis res.locals.user er lærer, returnér ALLE projekter - hvis res.locals.user er student, returnér kun projecter lavet af dén student
            ved get all projects OG get project by id requests, find først projektet i egen db, så hent hvilken portainer stack den hører sammen med - returnér som ét samlet object (kun med det data man skal bruge. F.eks. stack status, create date. F.eks. ikke swarm id, og hvad der ellers er af ligegyldig data)

            brug korrekte authentication middlewares til controllers - f.eks. at man skal være logget ind for at create eller delete projects
            */


            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            console.log('SOME OTHER ERROR!!!')
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

            const {data} = await Portainer.post('/auth', {
                username: process.env.PORTAINER_USERNAME,
                password: process.env.PORTAINER_PASSWORD
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            //how often does token change?
            const token = data.jwt;
            console.log(token)

            setPortainerToken(token);

            await Portainer.delete(`/stacks/${id}?endpointId=5`).then(async (res) => {
                console.log(res)
                console.log('JA TAK')
                //await createProject(templateId, 1, projectName,subdomainName)
            }).catch((err) => {
                console.log(err)
                console.log('is ogs')
            })

            //await deleteProjectByID(id)
            res.sendStatus(200)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}