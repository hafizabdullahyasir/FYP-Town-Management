const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConnections");
const { v4: uuid } = require("uuid");

class plots extends Model {}

plots.init(
  {
    PlotId: {
      type: DataTypes.STRING(80),
      primaryKey: true,
    },
    CustomerName: {
      type: DataTypes.STRING(82),
      allowNull: false,
    },
    FatherName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    PhoneNo: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    CNIC: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    PlotNumber: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    TotalArea: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    PricePerMarla: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    TotalPrice: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    MonthlyInstallment: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    PaidAmount: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    ToBePaid: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    TotalInstallments: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },

    PropertyType: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    // it is bydefault true so we not mentioned it seperatly for created at and updated at
    // timestamps:true
    // for creating additional table deleted at
    paranoid: true,
    sequelize,
  }
);
plots.beforeCreate(async (plot) => {
  plot.PlotId = uuid();
});
module.exports = plots;
