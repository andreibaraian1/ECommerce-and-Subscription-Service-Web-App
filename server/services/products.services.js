const pool = require("../db");
const getProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM PRODUCTS");
  return rows;
};
module.exports = {
  getProducts,
};
