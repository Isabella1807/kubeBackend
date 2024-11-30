import {getAllProjects, getProjectByID, createProject, deleteProjectByID} from "../models/projectModel.js";
//import axios from "axios";
//import dotenv from "dotenv";
//import portainer from "../Portainer.js"

//Makes it possible to use .env variables to hide login data
//dotenv.config()
const axios = require('axios');

export const projectController = {
    getAll: async (req, res) => {
        try {
            const {data} = await portainer.post('/auth', {
                username: process.env.PORTAINER_USERNAME,
                password: process.env.PORTAINER_PASSWORD
            })

            //how often does token change?
            const token = data.jwt;

            const stacks = await portainer.get(`/stacks`)

            /*console.log("Noghet unitk", data);*/
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
        const { templateId, projectName, subdomainName } = req.body;

            // Log for at kontrollere hvad der bliver sendt
    console.log("Request body:", req.body);

        if(typeof projectName !== 'string' ||  projectName.length === 0){
            res.status(400).send("no project name")
            return
        }

        if(typeof subdomainName !== 'string' ||  subdomainName.length === 0){
            res.status(400).send("no subdomain name")
            return
        }

        if(typeof templateId !== 'number'){
            res.status(400).send("template id is not a number")
            return
        }

        // get teplate bny id. if no template, send error

        try {
            await createProject(templateId, 1, projectName,subdomainName)
            res.sendStatus(200)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    delete: async (req, res) => {

        const id = parseInt(req.params.id)

        if (Number.isNaN(id)){
            res.status(400).send("id not a number")
            return
        }

        try {
            await deleteProjectByID(id)
            res.sendStatus(200)
        } catch (error) {
            res.status(500).send(error)
        }


    }

}