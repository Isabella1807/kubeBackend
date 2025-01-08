import project from "./project";
import role from "./role";
import team from "./team";
import template from "./template";
import users from "./users";

const initModels = () => {
    project.belongsTo(template, {as: "template", foreignKey: "templateId"});
    project.belongsTo(users, {as: "user", foreignKey: "userId"});
    users.belongsTo(role, {as: "role", foreignKey: "roleId"});
    users.belongsTo(team, {as: "team", foreignKey: "teamId"});
    users.hasMany(project, {as: "projects", foreignKey: "userId"});
    role.hasMany(users, {as: "users", foreignKey: "roleId"});
    team.hasMany(users, {as: "users", foreignKey: "teamId"});
    template.hasMany(project, {as: "projects", foreignKey: "templateId"});

    return {
        project,
        role,
        team,
        template,
        users,
    };
}

export default initModels;