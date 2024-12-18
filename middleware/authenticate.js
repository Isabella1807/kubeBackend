export const mustBeLoggedIn = (req, res, next) => {
    if (!res.locals.user) {
        res.status(401).send('Must be logged in');
        return;
    }
    next();
};

export const mustBeAdmin = (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(401).send('Must be logged in');
    }

    if (!user.role.isAdmin) {
        return res.status(403).send("Must be admin");
    }

    next();
};

export const mustBeFaculty = (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(401).send('Must be logged in');
    }

    if (!(user.role.isFaculty || user.role.isAdmin)) {
        return res.status(403).send("Must be faculty");
    }

    next();
};
