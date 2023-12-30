import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const classFee = sequelize.define(
  "classFee",
  {
    classFeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "class_fee_id",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "class_id",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ClassFee",
    schema: "dbo",
    timestamps: false,
  }
);

sequelize.options.logging = console.log;
classFee.sync();

export default classFee;
