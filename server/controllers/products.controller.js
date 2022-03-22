
const productsServices = require("../services/products.services");
const getProducts = async (req, res) => {
  try {
    const result = await productsServices.getProducts();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await productsServices.getProductById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  getProducts,
  getProduct,
};
