import seqDB from "../../SeqDB";
import {DataTypes} from 'sequelize';

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
        tableName: "Role"
    }
);

export default Role;

