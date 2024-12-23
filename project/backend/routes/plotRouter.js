var express = require("express");
var router = express.Router();
const {
  create,
  getAll,
  update,
  remove,
} = require("../Controller/plotController");

// middlewares
const {
  createPlot,
  getAllPlot,
  updatePlot,
  removePlot,
} = require("../Validation/plotValidator");

/* GET users listing. */

router.post("/create", createPlot, create);
router.get("/get-all", getAllPlot, getAll);
router.put("/update", updatePlot, update);
router.delete("/delete", removePlot, remove);

module.exports = router;
