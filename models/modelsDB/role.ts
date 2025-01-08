/*
import seqDB from "../../SeqDB";
import {DataTypes} from 'sequelize';
import Project from "./project";

const Role = seqDB.define('role', {
        roleId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    },
    {
        tableName: "role"
    }
);

/!*Role.sync({force: true}).then(() => {
    console.log('*** ROLE YES synced!')
}).catch((e) => {
    console.log('*!* ROLE error sync')
    console.log(e)
    console.log('===================')
});*!/

export default Role;

*/
