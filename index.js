import express from 'express';
import cors from 'cors';
import Router from './routes/routes.js'
import { deserializeUser } from "./middleware/deserializeUser.js";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(deserializeUser);


// routes
app.use(Router);

// start server
app.listen(port)
