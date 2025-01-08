import project from "./project";
import role from "./role";
import team from "./team";
import template from "./template";
import users from "./users";

const initModels = () => {

    // role.hasMany(users, {foreignKey: "roleId"});
    users.belongsTo(role, {foreignKey: "roleId"});

    // team.hasMany(users, {foreignKey: "teamId"});
    users.belongsTo(team, {foreignKey: "teamId"});

    // template.hasMany(project, {foreignKey: "templateId"});
    project.belongsTo(template, {foreignKey: "templateId"});

    // users.hasMany(project, {foreignKey: "userId"});
    project.belongsTo(users, {foreignKey: "userId"});

    return {
        project,
        role,
        team,
        template,
        users,
    };
}

export const models = initModels();
