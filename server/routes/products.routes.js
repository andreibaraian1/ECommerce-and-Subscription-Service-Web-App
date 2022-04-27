const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const checkAuth = require("../middleware/checkAuth.middleware");

router.get("/getProducts", productsController.getProducts);
router.get("/getProduct/:id", productsController.getProduct);
router.post('/updateProducts',checkAuth,productsController.updateProduct);
router.get('/deleteProduct/:id',checkAuth,productsController.deleteProduct);

module.exports = router;
