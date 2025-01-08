/*
import seqDB from "../../SeqDB";
import {DataTypes} from 'sequelize';

const Project = seqDB.define('project', {
        projectName: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        subdomainName: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        projectId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        templateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'template',
                key: 'templateId'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId'
            }
        },
        stackId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: seqDB.literal('CURRENT_TIMESTAMP')
        },
        lastChangeDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: seqDB.literal('CURRENT_TIMESTAMP')
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: "project"
    }
);

// Project.sync({force: true}).then(() => {
//     console.log('*** PROJECT YES synced!')
// }).catch(() => {
//     console.log('*!* PROJECT error sync')
// })

export default Project;
*/
