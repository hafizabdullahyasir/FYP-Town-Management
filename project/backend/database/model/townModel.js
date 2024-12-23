const { models } = require("../index");

module.exports = {
  // in working condition
  createTown: async (body) => {
    try {
      const data = await models.towns.create({ ...body });
      return {
        data: data,
      };
    } catch (error) {
      return {
        error: error.errors[0].message,
      };
    }
  },
  // in working condition
  getAllTowns: async (query) => {
    try {
      const data = await models.towns.findAndCountAll({
        attributes: {
          exclude: ["updatedAt", "deletedAt"],
        },
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.errors[0].message };
    }
  },
  // in working condition
  updateTown: async ({ TownId, ...body }) => {
    try {
      const data = await models.towns.update(
        { ...body },
        { where: { TownId: TownId } }
      );
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.errors[0].message };
    }
  },

  removeTown: async ({ TownId }) => {
    try {
      const data = await models.towns.destroy({ where: { TownId: TownId } });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.errors[0].message };
    }
  },
};
