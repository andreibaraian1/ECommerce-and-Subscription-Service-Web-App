const pool = require("../db");
const { getProducts } = require("./products.services");
const getCartByUserId = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM CART WHERE id_user=$1", [
    userId,
  ]);
  return rows;
};
const checkOrder = async (cartProducts, total) => {
  const products = await getProducts();
  let cart = cartProducts.map((cartProduct) => ({
    ...cartProduct,
    ...products?.find((t) => t.id === cartProduct.id),
  }));
  let sum = 0;
  cart.forEach((product) => {
    sum += product.price * product.quantity;
  });
  return {
    cart,
    valid: sum === total,
  };
};
const sendOrder = async (id, idUser, cart, total, res) => {
  const insertOrder = await pool.query(
    "INSERT INTO orders (id_user,products,total) VALUES ($1,$2,$3)",
    [idUser, JSON.stringify(cart), total]
  );
  await pool.query("DELETE FROM cart WHERE id=$1", [id]);
  if (insertOrder.rowCount) {
    return true;
  }
  return false;
};
module.exports = {
  getCartByUserId,
  checkOrder,
  sendOrder,
};
