import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasMany} from "sequelize-typescript";
import User from "./User";

@Table({
    timestamps: false,
    tableName: "roles",
    modelName: "Role",
})
class Role extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    roleId!: number;

    @Column({
        type: DataType.STRING
    })
    roleName!: string;

    @HasMany(() => User)
    users: User[];
}

export default Role;
