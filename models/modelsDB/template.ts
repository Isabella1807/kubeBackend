import seqDB from "../../SeqDB";
import {DataTypes} from 'sequelize';
import Project from "./project";

const Template = seqDB.define('template', {
        templateId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        templateText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        templateName: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    },
    {
        tableName: "template"
    }
);

/*Template.sync({force: true}).then(() => {
    console.log('*** TEMPLATE YES synced!')
}).catch(() => {
    console.log('*!* TEMPLATE error sync')
})*/

export default Template;