const pool = require('../db.config');
const getProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM PRODUCTS");
  return rows;
};
const getProductById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM PRODUCTS WHERE id=$1", [id]);
  return rows[0];
};
const updateQuantityById = async (id, quantity) => {
  await pool.query("UPDATE products SET stock=$1 WHERE id=$2", [quantity, id]);
};
module.exports = {
  getProducts,
  updateQuantityById,
  getProductById,
};
