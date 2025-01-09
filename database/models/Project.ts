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

import {literal} from "sequelize";

import User from "./User";
import Template from "./Template"

@Table({
    tableName: "projects",
    modelName: "Project",
    timestamps: false
})
class Project extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false
    })
    projectId!: string;

    @ForeignKey(() => Template)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    templateId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    stackId!: number;

    @Column({
        type: DataType.STRING(250),
        allowNull: false
    })
    projectName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    subdomainName!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
    })
    createdDate!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP')
    })
    lastChangeDate!: Date;

    @Column({
        type: DataType.TINYINT,
        allowNull: false
    })
    state!: number;
}

export default Project;
