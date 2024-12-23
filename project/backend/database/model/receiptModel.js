const { models } = require("../index");

module.exports = {
  // in working condition
  createReceipt: async (body) => {
    try {
      const data = await models.receipts.create({ ...body });
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
  getAllReceipts: async (query) => {
    try {
      const data = await models.receipts.findAndCountAll({
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
};

// code after updations

// const { models } = require("../index");
// const { findPlotByCNIC, updatePlotByCNIC } = require("./plotModel");

// module.exports = {
//   // Updated to handle receipt creation and plot updates
//   createReceipt: async (body) => {
//     try {
//       // Create a new receipt

//       const receiptData = await models.receipts.create({ ...body });
//       // console.log("====Mera Teer===>: ", receiptData);
//       // Find the associated plot using the CNIC
//       const plot = await findPlotByCNIC(body.cnicNumber);
//       if (!plot) {
//         throw new Error("No plot found for the provided CNIC.");
//       }

//       // Calculate the new PaidAmount and ToBePaid
//       const updatedPaidAmount = plot.PaidAmount + body.amount;
//       const updatedToBePaid = plot.ToBePaid - body.amount;

//       // Update the plot details
//       await updatePlotByCNIC(body.cnicNumber, {
//         PaidAmount: updatedPaidAmount,
//         ToBePaid: updatedToBePaid,
//       });

//       return {
//         data: receiptData,
//       };
//     } catch (error) {
//       return {
//         error: error.message || "An error occurred while creating the receipt.",
//       };
//     }
//   },

//   // No changes needed for getAllReceipts
//   getAllReceipts: async (query) => {
//     try {
//       const data = await models.receipts.findAndCountAll({
//         attributes: {
//           exclude: ["updatedAt", "deletedAt"],
//         },
//         paranoid: false,
//       });
//       return {
//         data: data,
//       };
//     } catch (error) {
//       return { error: error.errors[0].message };
//     }
//   },
// };
