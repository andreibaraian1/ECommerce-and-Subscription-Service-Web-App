const pool = require("../db.config");
const {
  getProducts,
  updateQuantityById,
  getProductById,
} = require("./products.services");

const dotenv = require("dotenv");
dotenv.config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

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
const sendOrder = async (idUser, cart, total, shippingInfo, paymentMethod) => {
  switch (paymentMethod) {
    case "Card":
      const items = cart.map((product) => ({
        price_data: {
          currency: "ron",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));
      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: "payment",
        success_url: `http://localhost:3000/`,
        cancel_url: `http://localhost:3000/`,
      });
      const valid = await insertOrder(
        idUser,
        cart,
        total,
        shippingInfo,
        "Processing",
        session.payment_intent

      );
      return { valid, url: session.url };
    case "Cash":
      const insert = await insertOrder(
        idUser,
        cart,
        total,
        shippingInfo,
        "Cash"
      );
      return { valid: insert };
    default:
      console.log("Payment method not valid");
  }
};
const insertOrder = async (idUser, cart, total, shippingInfo, status, paymentInt = null) => {
  const insertOrder = await pool.query(
    "INSERT INTO orders (id_user,products,total,shipping_info,status,payment_int) VALUES ($1,$2,$3,$4,$5,$6)",
    [idUser, JSON.stringify(cart), total, JSON.stringify(shippingInfo), status ,paymentInt]
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
const editOrderStatus = async(status,paymentInt) => {
  await pool.query(
    "UPDATE ORDERS SET status=$1 WHERE payment_int=$2",
    [status, paymentInt]
  );
}
module.exports = {
  checkOrder,
  sendOrder,
  getOrderByUserId,
  getOrders,
  editOrderStatus
};
