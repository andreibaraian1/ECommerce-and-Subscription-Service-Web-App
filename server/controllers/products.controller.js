const pool = require("../db.config");
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
const updateProduct = async (req, res) => {
  const role = req.role;
  const product = req.body[0];
  if (role === 0) {
    return res.status(200).send("User is not admin");
  }
  try {
    await pool.query(
      "UPDATE products SET name=$1,stock=$2,image=$3,price=$4,category=$5,details=$6 WHERE id=$7",
      [
        product.name,
        product.stock,
        product.image,
        product.price,
        product.category,
        product.details,
        product.id,
      ]
    );
    res.status(200).send("Product updated");
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const deleteProduct = async (req, res) => {
  const role = req.role;
  if (role === 0) {
    return res.status(200).send("User is not admin");
  }
  const id = +req.params.id;
  console.log(id);
  try {
    const deleteProduct = await pool.query("DELETE FROM products WHERE id=$1", [id]);
    console.log(deleteProduct);
    res.status(200).send("Product deleted");
  } catch (err) {
    res.status(500).send("Unexpected error");
    console.log(err);
  }
};
module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
