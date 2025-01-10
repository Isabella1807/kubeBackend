import express from 'express';
import cors from 'cors';
import Router from './routes/routes'
import { deserializeUser } from "./middleware/deserializeUser";
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import "./database/connection";

import dotenv from 'dotenv';
import minDB from "./database/connection";
import User from "./database/models/User";
import Role from "./database/models/Role";
import Team from "./database/models/Team";
import Project from "./database/models/Project";
import {
    createUser,
    fetchAllUsers,
    fetchUserById,
    getUserByMail,
    getUsersByTeamId,
    updateUserPasswordById
} from "./models/userModel";
import {getUserById} from "./controllers/userController";

dotenv.config();

const app = express();
const port = 3000;

// middlewares
app.use(express.json());

// Allowed methods, cause there was cors error when stopping projects in swagger
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(deserializeUser);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Kube Project API Documentation",
            version: "1.0",
            description: "Welcome to the Kube API documentation! Here you can see some of the endpoints. This documentation is a work in progress."
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: {
            bearerAuth: []
        },
    },
    apis: ["./**/*.yaml", "./routes/*.js"], // Finds all files in routes folder ending with .js
}

const spacs = swaggerjsdoc(options);
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)

// routes
app.use(Router);

// start server
app.listen(port)
/*setTimeout(async () => {
    await minDB.sync({ alter: true });
    await Project.create({
    templateId: 10,
    userId: 1,
    stackId: 121,
    projectName: "Projectnavn lol1",
    subdomainName: "subdomain",
    state: 1,
    })
}, 1000)*/

/*setTimeout(async () => {
    updateUserPasswordById(1, "TESTER").then((res) => {
        console.log("REEEES")
        console.log(res);
    }).catch((err) => {
        console.log('ERRERERR')
        console.log(err);
    })
}, 1000)*/
