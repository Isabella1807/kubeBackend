
export const mustBeLoggedIn = (req, res, next) => {
    if (!res.locals.user) {
        console.log("User not found in res.locals");
        res.status(401).send('Must be logged in');
        return;
    }

    console.log("User is logged in:", res.locals.user);
    next();
};


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
