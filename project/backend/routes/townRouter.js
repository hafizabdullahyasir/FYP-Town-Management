var express = require("express");
var router = express.Router();
const {
  create,
  getAll,
  update,
  remove,
} = require("../Controller/townController");

// middlewares
const {
  createTown,
  getAllTown,
  updateTown,
  removeTown,
} = require("../Validation/townValidator");
/* GET users listing. */
router.post("/create", createTown, create);
router.get("/get-all", getAllTown, getAll);
router.put("/update", updateTown, update);
router.delete("/delete", removeTown, remove);

module.exports = router;
