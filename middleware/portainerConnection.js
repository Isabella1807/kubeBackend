import Portainer, {setPortainerToken} from "../Portainer.js"

let timestampLastTokenRefresh = 0;

export const requirePortainerAuth = async (req, res, next) => {

    const secondsSinceLastRefresh = (Date.now() - timestampLastTokenRefresh) / 1000;
    // Don't refresh portainer token if it is less than 30 minutes since it was created.
    // Just continue to controller / next middleware
    if (secondsSinceLastRefresh < 60 * 30) {
        next();
        return;
    }

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
    timestampLastTokenRefresh = Date.now();

    next();
}
