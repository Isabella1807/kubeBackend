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
import User from "./User";

@Table({
    tableName: "teams",
    modelName: "Team",
    timestamps: false
})
class Team extends Model<Team> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    teamId?: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    teamName?: string;

    @HasMany(() => User)
    users?: User[];

}

export default Team;
