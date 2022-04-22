const cartServices = require("../services/cart.services");
const pool = require("../db.config");
const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { rows } = await pool.query("SELECT * FROM CART WHERE id_user=$1", [
      userId,
    ]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const insertCart = async (req, res) => {
  try {
    const userId = req.userId;
    const product = req.body.product;
    const { rows } = await pool.query("SELECT * FROM CART WHERE id_user=$1", [
      userId,
    ]);
    const cart = rows;
    const result = await cartServices.insertCart(userId, product, cart);
    if (result?.error) {
      res.status(result.status).json({ error: "unknown error" });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  getCart,
  insertCart,
};
