const cartServices = require("../services/cart.services");
const orderServices = require("../services/order.services");
const pool = require("../db.config");
const sendOrder = async (req, res) => {
  const total = req.body.total;
  const shippingInfo = req.body.shipping;
  const paymentMethod = req.body.paymentMethod;
  try {
    const cart = await cartServices.getCartByUserId(req.userId);
    const idUser = req.userId;
    const cartValidation = await orderServices.checkOrder(cart, total);
    if (cartValidation.valid) {
      const sendOrder = await orderServices.sendOrder(
        idUser,
        cartValidation.finalCart,
        total,
        shippingInfo,
        paymentMethod
      );
      if (sendOrder) {
        if (sendOrder?.url) {
          res.status(200).json({ url: sendOrder.url });
        } else {
          res.status(200).json("Order sent successfully");
        }
      } else {
        res
          .status(400)
          .json("There was an error while sending the error. Please try again");
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
const getOrderByUserId = async (req, res) => {
  const userId = req.userId;
  const getOrders = await orderServices.getOrderByUserId(userId);
  return res.status(200).json(getOrders);
};
const getOrders = async (req, res) => {
  try {
    if (req.role === 0) {
      return res.status(200).send({ error: "Not admin" });
    }
    const getOrders = await orderServices.getOrders();
    res.status(200).json(getOrders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected error");
  }
};
const updateOrderStatus = async (req, res) => {
  const id = req.body[0].id;
  const status = req.body[0].shipping_status;
  if (req.role === 0) {
    return res.status(200).send({ error: "Not admin" });
  }
  try {
    await pool.query("UPDATE ORDERS SET shipping_status=$1 WHERE id=$2", [
      status,
      id,
    ]);
    res.status(200).send("Order updated");
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const deleteOrder = async (req, res) => {
  const role = req.role;
  if (role === 0) {
    return res.status(200).send("User is not admin");
  }
  const id = +req.params.id;

  try {
    await pool.query("DELETE FROM orders WHERE id=$1", [
      id,
    ]);
    res.status(200).send("Order deleted");
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  sendOrder,
  getOrders,
  getOrderByUserId,
  updateOrderStatus,
  deleteOrder
};
