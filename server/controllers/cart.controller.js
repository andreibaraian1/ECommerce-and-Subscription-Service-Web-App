const pool = require("../db");
const cartServices = require("../services/cart.services");
const getCart = async (req, res) => {
  try {
    const result = await cartServices.getCartByUserId(req.userId);
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const insertCart = (req, res) => {
  try {
    pool.query(
      "SELECT * FROM CART WHERE id_user=$1",
      [req.userId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const { rowCount } = result;
          if (rowCount === 0) {
            const product = JSON.stringify(new Array(req.body.product));
            pool.query(
              "INSERT INTO CART (id_user,products) VALUES ($1,$2)",
              [req.userId, product],
              (err, result) => {
                if (err) {
                  res.status(400);
                } else {
                  res.status(200).send("Inserted into cart");
                }
              }
            );
          } else {
            let cart = result.rows[0].products;
            let ok = 0;
            cart.map((product, index) => {
              if (product.id === req.body.product.id) {
                product.quantity += req.body.product.quantity;
                ok = 1;
                if (product.quantity < 1) {
                  cart.splice(index, 1);
                }
              }
            });
            if (ok === 0) {
              cart.push(req.body.product);
            }
            const final = JSON.stringify(cart);
            pool.query(
              "UPDATE CART SET products=$1 WHERE id_user=$2",
              [final, req.userId],
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(400);
                } else {
                  res.status(200).send("Updated cart");
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const sendOrder = async (req, res) => {
  const total = req.body.total;
  try {
    const cart = await cartServices.getCartByUserId(req.userId);
    const { id } = cart[0];
    const idUser = req.userId;
    const cartValidation = await cartServices.checkOrder(
      cart[0].products,
      total
    );
    if (cartValidation.valid) {
      const sendOrder = cartServices.sendOrder(
        id,
        idUser,
        cartValidation.cart,
        total,
        res
      );
      if (sendOrder) {
        res.status(200).json("Order sent successfully");
      }
    } else {
      res.status(400).send({ error: "Prices changed. Please reload the app" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  getCart,
  insertCart,
  sendOrder,
};
