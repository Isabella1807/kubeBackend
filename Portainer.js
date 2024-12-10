import dotenv from "dotenv";
import axios from "axios";

//Makes it possible to use .env variables to hide login data
dotenv.config()

const Portainer = axios.create({
    baseURL: process.env.PORTAINER_BASEURL,
});

export const setPortainerToken = (token) => {
    Portainer.defaults.headers.common["Authorization"] = token;
    // Portainer.defaults.headers.common["Content-Type"] = 'multipart/form-data';
};

export default Portainer;
