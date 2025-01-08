import seqDB from "../../SeqDB";
import {DataTypes} from 'sequelize';

const Team = seqDB.define('team', {
        teamId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        teamName: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: "Team"
    }
);

export default Team;