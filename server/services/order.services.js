const pool = require("../middleware/db.middleware");
const {
  getProducts,
  updateQuantityById,
  getProductById,
} = require("./products.services");
const checkOrder = async (cartProducts, total) => {
  const products = await getProducts();
  let cart = cartProducts.map((cartProduct) => ({
    ...cartProduct,
    ...products?.find((payload) => payload.id === cartProduct.id),
  }));
  let sum = 0;
  let ok = true;
  cart.forEach((product) => {
    if (product.stock === 0) {
      ok = false;
    }
    sum += product.price * product.quantity;
  });
  return {
    cart,
    valid: sum === total && ok,
  };
};
const sendOrder = async (id, idUser, cart, total) => {
  const insertOrder = await pool.query(
    "INSERT INTO orders (id_user,products,total) VALUES ($1,$2,$3)",
    [idUser, JSON.stringify(cart), total]
  );
  cart.forEach(async (product) => {
    const payload = await getProductById(product.id);
    const stock = payload[0].stock - product.quantity;
    updateQuantityById(product.id, stock);
  });
  await pool.query("DELETE FROM cart WHERE id=$1", [id]);
  if (insertOrder.rowCount) {
    return true;
  }
  return false;
};
module.exports = {
  checkOrder,
  sendOrder,
};
