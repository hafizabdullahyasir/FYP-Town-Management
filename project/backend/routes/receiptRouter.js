var express = require("express");
var router = express.Router();
const { create, getAll } = require("../Controller/receiptController");

// middlewares
const {
  createReceipt,
  getAllReceipt,
} = require("../Validation/receiptValidator");
/* GET users listing. */

router.post("/create", createReceipt, create);
router.get("/get-all", getAllReceipt, getAll);

module.exports = router;

// after adding new updations

// var express = require("express");
// var router = express.Router();
// const { create, getAll } = require("../Controller/receiptController");

// // Middlewares for validation
// const {
//   createReceipt,
//   getAllReceipt,
// } = require("../Validation/receiptValidator");

// // Route to create a new receipt and update plot details
// router.post("/create", createReceipt, create);

// // Route to get all receipts
// router.get("/get-all", getAllReceipt, getAll);

// module.exports = router;
