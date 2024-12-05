import {getAllProjects, getProjectByID, createProject, deleteProjectByID} from "../models/projectModel.js";
//import axios from "axios";
import dotenv from "dotenv";
import Portainer, {setPortainerToken} from "../Portainer.js"
import axios from "axios";

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
            })

            //how often does token change?
            const token = data.jwt;
            console.log(token)

            setPortainerToken(token);





            //FETCH TEMPLATE BY ID OG SÆT TEMPLATE TEXT IND I STACKFILECONTENT
            // OG SÅ TEMPLATEID FRA POSTMAN SKAL HENTES SOM STACKFILECONTENT ISTEDET FOR ID




            // WEIRD STUFF FROM NOTES
            const subDomainWp = 'wompwomp'; //Det vi gerne vil lægge ind i SUBDOMAIN01 i yaml filen, skal være unik!
            const subdomainPma = 'wompwomp-pma'; //SUBDOMAIN02 i yaml filen som er subdomænet for phpmyadmin
            const websiteId = Math.random().toString(36).substring(7); //CHANGEME01 i yaml filen, står 4 steder. Definerer routeren, hvis det ikk gøres ordentligt kommer vores side ikk på nettet.
            const pmaId = Math.random().toString(36).substring(7); //CHANGEME02 i yaml filen, står 4 steder

            //ENGINX & WORDPRESS YAML WITH TEMPALTE LITERALS
            const fileContent = `{\"networks\":{\"traefik-proxy\":{\"external\":true}},\"services\":{\"test\":{\"image\":\"nginx:latest\",\"networks\":[\"traefik-proxy\"],\"deploy\":{\"labels\":[\"traefik.enable=true\",\"traefik.http.routers.${websiteId}.rule=Host('${subDomainWp}.kubelab.dk')\",\"traefik.http.routers.${websiteId}.entrypoints=web,websecure\",\"traefik.http.routers.${websiteId}.tls.certresolver=letsencrypt\",\"traefik.http.services.${websiteId}.loadbalancer.server.port=80\"]}}}}`
           /*const fileContent = `
networks:
  traefik-proxy:
    external: true
  wp-network:
    driver: overlay
services:
  wordpress:
    image: wordpress:latest
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppassword
      WORDPRESS_DB_NAME: wpdatabase
    networks:
      - traefik-proxy
      - wp-network
    deploy:
      labels:
        - traefik.enable=true
        - traefik.http.routers.${websiteId}.rule=Host("${subDomainWp}.kubelab.dk")
        - traefik.http.routers.${websiteId}.entrypoints=web,websecure
        - traefik.http.routers.${websiteId}.tls.certresolver=letsencrypt
        - traefik.http.services.${websiteId}.loadbalancer.server.port=80
  db:
    image: mariadb:latest
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wpdatabase
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppassword
    networks:
      - wp-network
  phpmyadmin:
    image: phpmyadmin:latest
    environment:
      PMA_HOST: db
      PMA_USER: wpuser
      PMA_PASSWORD: wppassword
    networks:
      - traefik-proxy
      - wp-network
    deploy:
      labels:
        - traefik.enable=true
        - traefik.http.routers.${pmaId}.rule=Host("${subdomainPma}.kubelab.dk")
        - traefik.http.routers.${pmaId}.entrypoints=web,websecure
        - traefik.http.routers.${pmaId}.tls.certresolver=letsencrypt
        - traefik.http.services.${pmaId}.loadbalancer.server.port=80
`*/

            // name cannot have a space
            // name cannot be capitalized
            await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, {
                "fromAppTemplate": false,
                "name": `${projectName}`,
                "stackFileContent": fileContent,
                "swarmID": "v1pkdou24tzjtncewxhvpmjms"
            }).then(async (res) => {
                console.log(res)
                console.log('JA TAK')
                //await createProject(templateId, 1, projectName,subdomainName)
            }).catch((err) => {
                console.log(err)
                console.log('is ogs')
            })

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