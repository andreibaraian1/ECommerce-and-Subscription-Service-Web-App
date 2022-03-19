const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth.middleware");
const orderController = require("../controllers/order.controller");

router.post("/sendOrder", checkAuth, orderController.sendOrder);

module.exports = router;
