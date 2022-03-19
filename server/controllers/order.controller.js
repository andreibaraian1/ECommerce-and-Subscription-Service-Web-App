const cartServices = require("../services/cart.services");
const orderServices = require("../services/order.services");
const pool = require("../middleware/db.middleware");
const sendOrder = async (req, res) => {
  const total = req.body.total;
  try {
    const cart = await cartServices.getCartByUserId(req.userId);
    const { id } = cart[0];
    const idUser = req.userId;
    const cartValidation = await orderServices.checkOrder(
      cart[0].products,
      total
    );
    if (cartValidation.valid) {
      const sendOrder = await orderServices.sendOrder(
        id,
        idUser,
        cartValidation.cart,
        total
      );
      if (sendOrder) {
        res.status(200).json("Order sent successfully");
      }
    } else {
      res
        .status(400)
        .send({
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
