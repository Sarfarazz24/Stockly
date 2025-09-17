const express = require("express");
const router = express.Router();

const {
  allOrders,
  newOrders,
  deleteOrder,
  checkOrder,
} = require("../Controllers/OrderController");

router.get("/allOrders", allOrders);
router.post("/newOrders", newOrders);
router.delete("/deleteOrders/:id", deleteOrder);
router.post("/checkOrders", checkOrder);

module.exports = router;
