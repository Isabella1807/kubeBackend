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
            })

            //how often does token change?
            const token = data.jwt;
            console.log(token)

            setPortainerToken(token);


            // WEIRD STUFF FROM NOTES
            const subDomainWp = 'wompwomp'; //Det vi gerne vil lægge ind i SUBDOMAIN01 i yaml filen, skal være unik!
            const subdomainPma = 'wompwomp-pma'; //SUBDOMAIN02 i yaml filen som er subdomænet for phpmyadmin
            const websiteId = Math.random().toString(36).substring(7); //CHANGEME01 i yaml filen, står 4 steder. Definerer routeren, hvis det ikk gøres ordentligt kommer vores side ikk på nettet.
            const pmaId = Math.random().toString(36).substring(7); //CHANGEME02 i yaml filen, står 4 steder

            const body = `networks:\\n  traefik-proxy:\\n    external: true\\n  wp-network:\\n    driver: overlay\\nservices:\\n  
    wordpress:\\n    image: wordpress:latest\\n    environment:\\n      WORDPRESS_DB_HOST: db\\n      
    WORDPRESS_DB_USER: wpuser\\n      WORDPRESS_DB_PASSWORD: wppassword\\n      WORDPRESS_DB_NAME: wpdatabase\\n    
    networks:\\n      - traefik-proxy\\n      - wp-network\\n    deploy:\\n      labels:\\n        
    - traefik.enable=true\\n        - traefik.http.routers.${websiteId}.rule=Host(\`${subDomainWp}.kubelab.dk\`)\\n        
    - traefik.http.routers.${websiteId}.entrypoints=web,websecure\\n        - traefik.http.routers.${websiteId}.tls.certresolver=letsencrypt\\n        
    - traefik.http.services.${websiteId}.loadbalancer.server.port=80\\n  db:\\n    image: mariadb:latest\\n    
    environment:\\n      MYSQL_ROOT_PASSWORD: rootpassword\\n      MYSQL_DATABASE: wpdatabase\\n      
    MYSQL_USER: wpuser\\n      MYSQL_PASSWORD: wppassword\\n    networks:\\n      - wp-network\\n  phpmyadmin:\\n    
    image: phpmyadmin:latest\\n    environment:\\n      PMA_HOST: db\\n      PMA_USER: wpuser\\n      
    PMA_PASSWORD: wppassword\\n    networks:\\n      - traefik-proxy\\n      - wp-network\\n    deploy:\\n      
    labels:\\n        - traefik.enable=true\\n        - traefik.http.routers.${pmaId}.rule=Host(\`${subdomainPma}.kubelab.dk\`)\\n        
    - traefik.http.routers.${pmaId}.entrypoints=web,websecure\\n        - traefik.http.routers.${pmaId}.tls.certresolver=letsencrypt\\n        
    - traefik.http.services.${pmaId}.loadbalancer.server.port=80
`;

            const formData = new FormData();

            formData.append('fromAppTemplate', false);
            formData.append('name', 'enhjorning');
            formData.append('stackFileContent', body);
            formData.append('swarmID', 'jpofkc0i9uo9wtx1zesuk649w');

            Portainer.defaults.headers.common["Content-Type"] = 'multipart/form-data';

            await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, formData).then((res) => {
                console.log("hurra ");
                console.log(res);
            }).catch((error) => {
                console.log("We got error");
                console.log(error);
                console.log("We got error");
            })


            // const response = await portainer.post(`/stacks`, {
            /*await Portainer.post(`/stacks/create/swarm/string?endpointId=5`, {
                body: {
                    fromAppTemplate: false,
                    name: "enhjorningyoo",
                    stackFileContent: body,
                    swarmID: "jpofkc0i9uo9wtx1zesuk649w",
                }
            }).then((res) => {
                console.log("hurra ");
                console.log(res);
            }).catch((error) => {
                console.log("We got error");
                console.log(error);
                console.log("We got error");
            })*/

            console.log("===========================================");


            // await createProject(templateId, 1, projectName,subdomainName)
            res.sendStatus(200)
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
            await deleteProjectByID(id)
            res.sendStatus(200)
        } catch (error) {
            res.status(500).send(error)
        }


    }

}