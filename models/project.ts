import seqDB from "../Database";
import { DataTypes } from 'sequelize';

const Project = seqDB.define('project', {
    projectName: {
        type: DataTypes.STRING
    },
    subdomainName: {
        type: DataTypes.STRING
    },
    projectId: {
        type: DataTypes.INTEGER
    },
    templateId: {

    },
    userId: {

    },
    stackId: {

    },
    createdDate: {

    },
    lastChangeDate: {

    },
    state: {

    }
});