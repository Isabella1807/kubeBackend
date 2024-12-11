
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
    const user = res.locals.user;

    if (!user) {
        return res.status(401).send('Must be logged in');
    }

    if (user.roleId !== 1) {
        console.log(`User roleId: ${user.roleId} - Access denied`);
        return res.status(403).send("Must be admin");
    }

    next();
};

export const mustBeFaculty = (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(401).send('Must be logged in');
    }

    if (user.roleId !== 1) {
        console.log(`User roleId: ${user.roleId} - Access denied`);
        return res.status(403).send("Must be faculty");
    }

    next();
};

export const mustBeStudent = (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(401).send('Must be logged in');
    }

    if (user.roleId !== 1) {
        console.log(`User roleId: ${user.roleId} - Access denied`);
        return res.status(403).send("Must be student");
    }

    next();
};

