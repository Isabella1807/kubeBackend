import dotenv from "dotenv";
import axios from "axios";

//Makes it possible to use .env variables to hide login data
dotenv.config()

const portainer = axios.create({
    baseURL: process.env.PORTAINER_BASEURL,
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJmaWVodW5kIiwicm9sZSI6Miwic2NvcGUiOiJkZWZhdWx0IiwiZm9yY2VDaGFuZ2VQYXNzd29yZCI6ZmFsc2UsImV4cCI6MTczMjY0MzM2MywiaWF0IjoxNzMyNjE0NTYzLCJqdGkiOiI4OWZlNTc2Yy1hNjFjLTQ0NzgtYmJlZi0zYjJmYzhjOWIyMjkifQ.nXRyT4fZzMNXG_owCSl0X2GdOXmTWzduB9_5_6oG-6I'
    }
});

export default portainer;