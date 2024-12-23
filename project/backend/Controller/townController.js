const {
  createTown,
  getAllTowns,
  updateTown,
  removeTown,
} = require("../database/model/townModel");
const responseHandler = require("../responseHandler");

// in working condition
const create = async (req, res) => {
  try {
    const town = await createTown(req.body);
    return responseHandler(res, town);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

// in working condition
const getAll = async (req, res) => {
  try {
    const town = await getAllTowns();
    return responseHandler(res, { data: town });
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

// in working condition
const update = async (req, res) => {
  try {
    const user = await updateTown(req.body);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

const remove = async (req, res) => {
  try {
    const user = await removeTown(req.query);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

module.exports = { create, getAll, update, remove };
