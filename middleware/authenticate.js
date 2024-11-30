
export const mustBeLoggedIn = (req, res, next) => {
    if (!res.locals.user) {
        res.status(401).send('Must be logged in');
        return;
    }

    next();
}

export const mustBeAdmin = (req, res, next) => {
    if (!res.locals.user) {
        res.status(401).send('Must be logged in');
        return;
    }

    if(res.locals.user.roleId !== 1){
        res.status(403).send("Must be admin");
        return;
    }

    next()
}

export const mustBeFaculty = (req, res, next) => {
    if (!res.locals.user) {
        res.status(401).send('Must be logged in');
        return;
    }

    if(res.locals.user.roleId !== 3){
        next()
        return;
    }

    res.status(403).send("Must be faculty");
}
