const pool = require("../db.config");
const {
  getProducts,
  updateQuantityById,
  getProductById,
} = require("./products.services");
const checkOrder = async (cartProducts, total) => {
  const products = await getProducts();
  let cart = cartProducts.map((cartProduct) => ({
    ...cartProduct,
    ...products?.find((payload) => payload.id === cartProduct.id_product),
    idCart: cartProduct.id,
  }));
  const finalCart = cart.map((product) => {
    return {
      id: product.id_product,
      quantity: product.quantity,
      name: product.name,
      stock: product.stock,
      price: product.price,
      idCart: product.idCart,
    };
  });
  let sum = 0;
  let ok = true;
  for (const product in finalCart) {
    const payload = finalCart[product];
    if (payload.stock === 0) {
      ok = false;
    }
    sum += payload.price * payload.quantity;
  }
  return {
    finalCart,
    valid: sum === total && ok,
  };
};
const sendOrder = async (idUser, cart, total,shippingInfo) => {
  const insertOrder = await pool.query(
    "INSERT INTO orders (id_user,products,total,shipping_info) VALUES ($1,$2,$3,$4)",
    [idUser, JSON.stringify(cart), total,JSON.stringify(shippingInfo)]
  );
  cart.forEach(async (product) => {
    const payload = await getProductById(product.id);
    const stock = payload.stock - product.quantity;
    updateQuantityById(product.id, stock);
  });
  for (const product in cart) {
    const payload = cart[product];

    await pool.query("DELETE FROM cart WHERE id=$1", [payload.idCart]);
  }

  if (insertOrder.rowCount) {
    return true;
  }
  return false;
};
const getOrderByUserId = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM ORDERS WHERE id_user=$1", [
    userId,
  ]);
  return rows;
};
const getOrders = async () => {
  const { rows } = await pool.query("SELECT * FROM ORDERS");
  return rows;
};
module.exports = {
  checkOrder,
  sendOrder,
  getOrderByUserId,
  getOrders,
};
