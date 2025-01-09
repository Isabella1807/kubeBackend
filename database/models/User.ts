import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    ForeignKey
} from "sequelize-typescript";
import Role from "./Role";
import Team from "./Team";
import Project from "./Project";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: false
})

class User extends Model
{
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    userId!: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    @ForeignKey(() => Team)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    teamId!: number;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    uclMail!: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName!: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    lastName!: string;

    @HasMany(() => Project)
    projects!: Project[];
}

export default User;
