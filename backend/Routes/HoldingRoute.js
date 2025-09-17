const express = require("express");
const router = express.Router();

const {
  allHoldings,
  newHoldings,
} = require("../Controllers/HoldingController");

router.get("/allHoldings", allHoldings);
router.post("/newHoldings", newHoldings);

module.exports = router;
