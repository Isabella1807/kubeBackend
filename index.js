import express from 'express';
import cors from 'cors';
import Router from './routes/routes.js'
import { deserializeUser } from "./middleware/deserializeUser.js";
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

import dotenv from 'dotenv';
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
            version: "0.1",
            description: "Welcome to the Kube API documentation! Here you can see some of the endpoints. This documentation is a work in progress."
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"], // Finds all files in routes folder ending with .js
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
