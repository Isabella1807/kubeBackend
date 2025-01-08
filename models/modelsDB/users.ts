import {seqDB} from "../../SeqDB";
import {DataTypes} from 'sequelize';

const Users = seqDB.define('users', {
        userId: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        uclMail: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'role',
                key: 'roleId'
            }
        },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'teamId'
            }
        }
    },
    {
        tableName: "Users"
    }
);

export default Users;