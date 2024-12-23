const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConnections");
const { v4: uuid } = require("uuid");

class receipts extends Model {}

receipts.init(
  {
    receiptId: {
      type: DataTypes.STRING(80),
      primaryKey: true,
    },
    buyerName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    cnicNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    shopHouseNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    areaMeasurement: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    townName: {
      type: DataTypes.STRING(82),
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING(24),
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

receipts.beforeCreate(async (receipt) => {
  receipt.receiptId = uuid();
});
module.exports = receipts;
