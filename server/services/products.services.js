const pool = require("../middleware/db.middleware");
const getProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM PRODUCTS");
  return rows;
};
const getProductById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM PRODUCTS WHERE id=$1", [id]);
  return rows;
};
const updateQuantityById = async (id, quantity) => {
  await pool.query("UPDATE products SET stock=$1 WHERE id=$2", [quantity, id]);
};
module.exports = {
  getProducts,
  updateQuantityById,
  getProductById,
};
