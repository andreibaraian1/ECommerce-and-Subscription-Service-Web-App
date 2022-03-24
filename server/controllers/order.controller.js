const cartServices = require("../services/cart.services");
const orderServices = require("../services/order.services");
const pool = require("../db.config");
const sendOrder = async (req, res) => {
  const total = req.body.total;
  try {
    const cart = await cartServices.getCartByUserId(req.userId);
    const idUser = req.userId;
    const cartValidation = await orderServices.checkOrder(cart, total);
    if (cartValidation.valid) {
      const sendOrder = await orderServices.sendOrder(
        idUser,
        cartValidation.finalCart,
        total
      );
      if (sendOrder) {
        res.status(200).json("Order sent successfully");
      }
    } else {
      res.status(400).send({
        error: "The product is no longer available. Please try again.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  sendOrder,
};
