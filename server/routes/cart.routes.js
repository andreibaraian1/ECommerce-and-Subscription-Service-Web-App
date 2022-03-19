const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth.middleware");
const cartController = require("../controllers/cart.controller");

router.get("/getCart", checkAuth, cartController.getCart);
router.post("/insertCart", checkAuth, cartController.insertCart);
module.exports = router;
