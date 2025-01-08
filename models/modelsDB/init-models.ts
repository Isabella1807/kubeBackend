import {DataTypes} from "sequelize";
import project from "./project";
import role from "./role";
import team from "./team";
import template from "./template";
import users from "./users";

const initModels = (DB) => {
    const Project = project(DB, DataTypes);
    const Role = role(DB, DataTypes);
    const Team = team(DB, DataTypes);
    const Template = template(DB, DataTypes);
    const Users = users(DB, DataTypes);

    Project.belongsTo(Template, {as: "template", foreignKey: "templateId"});
    Project.belongsTo(Users, {as: "user", foreignKey: "userId"});
    Users.belongsTo(Role, {as: "role", foreignKey: "roleId"});
    Users.belongsTo(Team, {as: "team", foreignKey: "teamId"});
    Users.hasMany(Project, {as: "projects", foreignKey: "userId"});
    Role.hasMany(Users, {as: "users", foreignKey: "roleId"});
    Team.hasMany(Users, {as: "users", foreignKey: "teamId"});
    Template.hasMany(Project, {as: "projects", foreignKey: "templateId"});

    return {
        Project,
        Role,
        Team,
        Template,
        Users,
    };
}

export default initModels;