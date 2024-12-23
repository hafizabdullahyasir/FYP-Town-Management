// const { models } = require("../index");

// module.exports = {
//   createPlot: async (body) => {
//     try {
//       const data = await models.plots.create({ ...body });
//       return {
//         data: data,
//       };
//     } catch (error) {
//       return {
//         // error: error.errors[0].message,
//         error: error.message,
//       };
//     }
//   },

//   getAllPlots: async (query) => {
//     try {
//       const data = await models.plots.findAndCountAll({
//         // attributes: {
//         //   exclude: ["password", "deletedAt"],
//         // },
//         paranoid: false,
//       });
//       return {
//         data: data,
//       };
//     } catch (error) {
//       return { error: error.errors[0].message };
//     }
//   },

//   updatePlot: async ({ PlotId, ...body }) => {
//     try {
//       const data = await models.plots.update(
//         { ...body },
//         { where: { PlotId: PlotId } }
//       );

//       return {
//         data: data,
//       };
//     } catch (error) {
//       return { error: error.errors[0].message };
//     }
//   },

//   removePlot: async ({ PlotId }) => {
//     try {
//       const data = await models.plots.destroy({ where: { PlotId: PlotId } });
//       return {
//         data: data,
//       };
//     } catch (error) {
//       return { error: error.errors[0].message };
//     }
//   },
// };



// code after updations





const { models } = require("../index");

module.exports = {
  // Create a new plot
  createPlot: async (body) => {
    try {
      const data = await models.plots.create({ ...body });
      return {
        data: data,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  // Get all plots
  getAllPlots: async (query) => {
    try {
      const data = await models.plots.findAndCountAll({
        paranoid: false,
      });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.errors[0].message };
    }
  },

  // Update plot by ID
  updatePlot: async ({ PlotId, ...body }) => {
    try {
      const data = await models.plots.update(
        { ...body },
        { where: { PlotId: PlotId } }
      );

      return {
        data: data,
      };
    } catch (error) {
      return { error: error.errors[0].message };
    }
  },

  // Remove a plot by ID
  removePlot: async ({ PlotId }) => {
    try {
      const data = await models.plots.destroy({ where: { PlotId: PlotId } });
      return {
        data: data,
      };
    } catch (error) {
      return { error: error.errors[0].message };
    }
  },

  // Find plot by CNIC
  findPlotByCNIC: async (cnicNumber) => {
    try {
      const data = await models.plots.findOne({ where: { CNIC: cnicNumber } });
      return data;
    } catch (error) {
      return { error: error.message };
    }
  },

  // Update plot by CNIC
  updatePlotByCNIC: async (cnicNumber, updateData) => {
    try {
      const data = await models.plots.update(updateData, {
        where: { CNIC: cnicNumber },
      });
      return data;
    } catch (error) {
      return { error: error.message };
    }
  },
};
