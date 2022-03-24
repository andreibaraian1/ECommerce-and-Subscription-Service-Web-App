const cartServices = require("../services/cart.services");
const getCart = async (req, res) => {
  try {
    const result = await cartServices.getCartByUserId(req.userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const insertCart = async (req, res) => {
  try {
    const userId = req.userId;
    const product = req.body.product;
    const cart = await cartServices.getCartByUserId(userId);
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
