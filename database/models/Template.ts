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

import Project from "./Project";

@Table({
    tableName: "templates",
    modelName: "Template",
    timestamps: false
})

class Template extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false
    })
    templateId!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    templateText!: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
    })
    templateName!: string;

    @HasMany(() => Project)
    projects: Project[];
}

export default Template;
