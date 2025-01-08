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

@Table({
    tableName: "users",
    modelName: "User",
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    userId!: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER
    })
    roleId!: number;

    @Column({
        type: DataType.STRING
    })
    firstName!: string;
}

export default User;
