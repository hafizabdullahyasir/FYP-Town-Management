const joi = require("joi");
const responseHandler = require("../responseHandler");

const createValidation = joi.object({
  TownId: joi.string().min(1).max(32).required(),
  townName: joi.string().min(3).max(100).required(),
});

const getAllValidation = joi.object({}).optional();

const updateValidation = joi
  .object({
    TownId: joi.string().min(1).max(32).optional(),
    townName: joi.string().min(6).max(100).optional(),
  })
  .unknown(true);

const removeValidation = joi.object({
  TownId: joi.string().min(1).max(32).required(),
});

// Middleware functions
const createTown = async (req, res, next) => {
  try {
    console.log("===========Before Town=====>:", req.body);
    await createValidation.validateAsync(req.body);

    next();
  } catch (error) {
    return responseHandler(res, { error: error.message });
  }
};

const getAllTown = async (req, res, next) => {
  try {
    await getAllValidation.validateAsync(req.query);
    next();
  } catch (error) {
    return responseHandler(res, { error: error.message });
  }
};

const updateTown = async (req, res, next) => {
  try {
    await updateValidation.validateAsync(req.body);
    next();
  } catch (error) {
    return responseHandler(res, { error: error.message });
  }
};

const removeTown = async (req, res, next) => {
  try {
    await removeValidation.validateAsync(req.query);
    next();
  } catch (error) {
    return responseHandler(res, { error: error.message });
  }
};

module.exports = { createTown, getAllTown, updateTown, removeTown };
