const sequelize = require("./dbConnections");

const towns = require("./tables/towns");
const receipts = require("./tables/receipts");
const plots = require("./tables/plots");

const models = { towns, receipts, plots };

sequelize.models = models;
module.exports = { sequelize, models };
