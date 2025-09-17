const express = require("express");
const router = express.Router();

const { allPositions } = require("../Controllers/PositionController");

router.get("/allPositions", allPositions);

module.exports = router;
