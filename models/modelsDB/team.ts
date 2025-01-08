import seqDB from "../../SeqDB";
import {DataTypes} from 'sequelize';
import Project from "./project";

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
        tableName: "team"
    }
);

/*Team.sync({force: true}).then(() => {
    console.log('*** TEAM YES synced!')
}).catch(() => {
    console.log('*!* TEAM error sync')
})*/

export default Team;