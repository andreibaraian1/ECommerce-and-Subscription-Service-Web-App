const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth.middleware");
const orderController = require("../controllers/order.controller");

router.post("/sendOrder", checkAuth, orderController.sendOrder);
router.get("/getOrdersAdmin", checkAuth, orderController.getOrders);
router.get('/getOrders',checkAuth,orderController.getOrderByUserId);
module.exports = router;
