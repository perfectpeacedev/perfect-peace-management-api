import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";


const _ = sequelize.define('expense', {
    expenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'expense_id'
    },
    expense: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Expense',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Expense__404B6A6BD85DA608",
        unique: true,
        fields: [
          { name: "expense_id" },
        ]
      },
    ]
  });

export default _
