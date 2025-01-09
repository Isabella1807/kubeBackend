import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BeforeCreate,
    HasMany,
    ForeignKey
} from "sequelize-typescript";
import Role from "./Role";
import Team from "./Team";

@Table({
    tableName: "users",
    modelName: "User",
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    userId!: number;

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
        type: DataType.STRING
    })
    firstName!: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    lastName!: string;

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
}

export default User;
