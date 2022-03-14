const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controllers");

router.get("/getProducts", productsController.getProducts);
router.get("/getProduct/:id", productsController.getProduct);

module.exports = router;
