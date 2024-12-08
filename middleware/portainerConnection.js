import Portainer, {setPortainerToken} from "../Portainer.js"

export const requirePortainerAuth = async (req, res, next) => {

    // Get authorization token
    const token = await Portainer.post('/auth', {
        username: process.env.PORTAINER_USERNAME,
        password: process.env.PORTAINER_PASSWORD
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.data['jwt'] ?? null;
    }).catch(() => {
        return null;
    });

    if (!token) {
        res.status(500).send('Could not authenticate with Portainer');
        return;
    }

    setPortainerToken(token);

    next();
}
