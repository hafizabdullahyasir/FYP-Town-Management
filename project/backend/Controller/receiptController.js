const {
  createReceipt,
  getAllReceipts,
} = require("../database/model/receiptModel");
const responseHandler = require("../responseHandler");

// in working condition
const create = async (req, res) => {
  try {
    const receipt = await createReceipt(req.body);
    return responseHandler(res, receipt);
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

// in working condition
const getAll = async (req, res) => {
  try {
    const receipt = await getAllReceipts();
    return responseHandler(res, { data: receipt });
  } catch (error) {
    return responseHandler(res, { error: error });
  }
};

module.exports = { create, getAll };

// after new updations

// const {
//   createReceipt,
//   getAllReceipts,
// } = require("../database/model/receiptModel");
// const {
//   updatePlotByCNIC,
//   findPlotByCNIC,
// } = require("../database/model/plotModel"); // Import necessary functions for plots
// const responseHandler = require("../responseHandler");

// // Updated create function with additional functionality
// const create = async (req, res) => {
//   try {
//     const { cnicNumber, amount } = req.body;

//     // Find the plot by CNIC
//     const plot = await findPlotByCNIC(cnicNumber);

//     if (!plot) {
//       return responseHandler(
//         res,
//         { error: "Plot not found with the provided CNIC!" },
//         404
//       );
//     }

//     // Update PaidAmount and ToBePaid in the plot
//     const updatedPlot = await updatePlotByCNIC(cnicNumber, {
//       PaidAmount: plot.PaidAmount + amount,
//       ToBePaid: plot.ToBePaid - amount,
//     });

//     if (!updatedPlot) {
//       return responseHandler(
//         res,
//         { error: "Failed to update plot information!" },
//         500
//       );
//     }

//     // Create the receipt
//     const receipt = await createReceipt(req.body);

//     return responseHandler(res, {
//       message: "Receipt created and plot updated successfully!",
//       receipt,
//       updatedPlot,
//     });
//   } catch (error) {
//     return responseHandler(res, { error: error });
//   }
// };

// // In working condition
// const getAll = async (req, res) => {
//   try {
//     const receipt = await getAllReceipts();
//     return responseHandler(res, { data: receipt });
//   } catch (error) {
//     return responseHandler(res, { error: error });
//   }
// };

// module.exports = { create, getAll };
