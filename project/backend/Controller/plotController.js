const {
  createPlot,
  getAllPlots,
  updatePlot,
  removePlot,
} = require("../database/model/plotModel");
const responseHandler = require("../responseHandler");

const create = async (req, res) => {
  try {
    const plot = await createPlot(req.body);

    return responseHandler(res, plot);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const getAll = async (req, res) => {
  try {
    const plot = await getAllPlots();
    return responseHandler(res, { data: plot });
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const update = async (req, res) => {
  try {
    const plot = await updatePlot(req.body);

    return responseHandler(res, plot);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const remove = async (req, res) => {
  try {
    const plot = await removePlot(req.query);
    return responseHandler(res, plot);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

module.exports = { create, getAll, update, remove };
