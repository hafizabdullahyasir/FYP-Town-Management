// const joi = require("joi");
// const responseHandler = require("../responseHandler");

// const createValidation = joi.object({
//   CustomerName: joi.string().min(3).max(82).required(),
//   FatherName: joi.string().min(3).max(80).required(),
//   Address: joi.string().min(3).max(100).required(),
//   PhoneNo: joi.string().min(3).max(32).required(),
//   CNIC: joi.string().min(3).max(15).required(),
//   PlotNumber: joi.string().min(1).max(1000).required(),
//   TotalArea: joi.string().min(1).max(80).required(),
//   PricePerMarla: joi.string().min(4).max(32).required(),
//   TotalPrice: joi.string().min(4).max(32).required(),
//   MonthlyInstallment: joi.string().min(4).max(32).required(),
//   PaidAmount: joi.string().min(4).max(32).required(),
//   ToBePaid: joi.string().min(4).max(32).required(),
//   TotalInstallments: joi.string().min(1).max(24).required(),
//   PropertyType: joi.string().min(1).max(64).required(),
// });

// const getAllValidation = joi.object({}).optional();

// const updateValidation = joi
//   .object({
//     plotId: joi.string().min(3).max(80).optional(),
//     CustomerName: joi.string().min(3).max(82).required(),
//     FatherName: joi.string().min(3).max(80).required(),
//     Address: joi.string().min(3).max(100).required(),
//     PhoneNo: joi.string().min(3).max(32).required(),
//     CNIC: joi.string().min(3).max(15).required(),
//   })
//   .unknown(true);

// const removeValidation = joi.object({
//   PlotId: joi.string().min(3).max(80).required(),
// });

// // Middleware functions
// const createPlot = async (req, res, next) => {
//   try {
//     await createValidation.validateAsync(req.body);
//     next();
//   } catch (error) {
//     return responseHandler(res, { error: error.message });
//   }
// };

// const getAllPlot = async (req, res, next) => {
//   try {
//     await getAllValidation.validateAsync(req.query);
//     next();
//   } catch (error) {
//     return responseHandler(res, { error: error.message });
//   }
// };

// const updatePlot = async (req, res, next) => {
//   // console.log("=====Before Validation===>: ", req.body);
//   try {
//     await updateValidation.validateAsync(req.body);
//     // console.log("=====Before Validation===>: ", req.body);
//     next();
//   } catch (error) {
//     return responseHandler(res, { error: error.message });
//   }
// };

// const removePlot = async (req, res, next) => {
//   try {
//     await removeValidation.validateAsync(req.query);
//     next();
//   } catch (error) {
//     return responseHandler(res, { error: error.message });
//   }
// };

// module.exports = { createPlot, getAllPlot, updatePlot, removePlot };



const joi = require("joi");
const responseHandler = require("../responseHandler");

// Updated validation schemas
const createValidation = joi.object({
  CustomerName: joi.string().min(3).max(82).required(),
  FatherName: joi.string().min(3).max(80).required(),
  Address: joi.string().min(3).max(100).required(),
  PhoneNo: joi.string().min(3).max(32).required(),
  CNIC: joi.string().length(13).required(), // CNIC should be 13 digits
  PlotNumber: joi.number().min(1).required(), // Changed to number
  TotalArea: joi.number().min(1).required(), // Changed to number
  PricePerMarla: joi.number().min(1).required(), // Changed to number
  TotalPrice: joi.number().min(1).required(), // Changed to number
  MonthlyInstallment: joi.number().min(1).required(), // Changed to number
  PaidAmount: joi.number().min(0).required(), // Changed to number, can be 0
  ToBePaid: joi.number().min(0).required(), // Changed to number, can be 0
  TotalInstallments: joi.number().min(1).required(), // Changed to number
  PropertyType: joi.string().min(1).max(64).required(),
});

const getAllValidation = joi.object({}).optional();

const updateValidation = joi
  .object({
    plotId: joi.string().optional(),
    CustomerName: joi.string().min(3).max(82).required(),
    FatherName: joi.string().min(3).max(80).required(),
    Address: joi.string().min(3).max(100).required(),
    PhoneNo: joi.string().min(3).max(32).required(),
    CNIC: joi.string().length(13).required(),
  })
  .unknown(true);

const removeValidation = joi.object({
  PlotId: joi.string().min(3).max(80).required(),
});

// Middleware functions
const createPlot = async (req, res, next) => {
  console.log("Incoming Data for Create Plot:", req.body); // Debug incoming data
  try {
    await createValidation.validateAsync(req.body);
    next();
  } catch (error) {
    console.error("Validation Error:", error.message); // Log error for debugging
    return responseHandler(res, { error: error.message });
  }
};

const getAllPlot = async (req, res, next) => {
  try {
    await getAllValidation.validateAsync(req.query);
    next();
  } catch (error) {
    console.error("Validation Error:", error.message); // Log error for debugging
    return responseHandler(res, { error: error.message });
  }
};

const updatePlot = async (req, res, next) => {
  console.log("Incoming Data for Update Plot:", req.body); // Debug incoming data
  try {
    await updateValidation.validateAsync(req.body);
    next();
  } catch (error) {
    console.error("Validation Error:", error.message); // Log error for debugging
    return responseHandler(res, { error: error.message });
  }
};

const removePlot = async (req, res, next) => {
  console.log("Incoming Data for Remove Plot:", req.query); // Debug incoming data
  try {
    await removeValidation.validateAsync(req.query);
    next();
  } catch (error) {
    console.error("Validation Error:", error.message); // Log error for debugging
    return responseHandler(res, { error: error.message });
  }
};

module.exports = { createPlot, getAllPlot, updatePlot, removePlot };

