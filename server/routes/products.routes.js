const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

router.get("/getProducts", productsController.getProducts);
router.get("/getProduct/:id", productsController.getProduct);

module.exports = router;
