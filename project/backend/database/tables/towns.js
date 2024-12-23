const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConnections");

class towns extends Model {}

towns.init(
  {
    TownId: {
      type: DataTypes.STRING(32),
      unique: true,
      primaryKey: true,
    },
    townName: {
      type: DataTypes.STRING(100),
      unique: true,
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
module.exports = towns;
