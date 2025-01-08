import seqDB from "../../SeqDB";
import { DataTypes } from 'sequelize';

const Template = seqDB.define('template', {
    templateId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    templateText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    templateName: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  },
    {
        tableName: "Template"
    }
  );

export default Template;