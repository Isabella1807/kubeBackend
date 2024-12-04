import dotenv from "dotenv";
import axios from "axios";

//Makes it possible to use .env variables to hide login data
dotenv.config()

const Portainer = axios.create({
    baseURL: process.env.PORTAINER_BASEURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const setPortainerToken = (token) => {
    Portainer.defaults.headers.common["Authorization"] = token;
};

export default Portainer;
