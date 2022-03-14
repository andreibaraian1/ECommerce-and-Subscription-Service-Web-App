const pool = require("../db");
const getProducts = (req, res) => {
  try {
    pool.query("SELECT * FROM PRODUCTS", (err, result) => {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json(result.rows);
      }
    });
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const getProduct = (req, res) => {
  const id = req.params.id;
  try {
    pool.query("SELECT * FROM PRODUCTS WHERE id=$1", [id], (err, result) => {
      if (err) {
        res.status(400);
      } else res.status(200).json(result.rows[0]);
    });
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  getProducts,
  getProduct,
};
