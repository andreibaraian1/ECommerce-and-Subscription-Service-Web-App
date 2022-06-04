const pool = require("../db.config");
const {
  getProducts,
  updateQuantityById,
  getProductById,
} = require("./products.services");
const { manageSubscription } = require("./users.services");

const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

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
      category: product.category,
      details: product.details,
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
        success_url: process.env.HOSTNAME,
        cancel_url: process.env.HOSTNAME,
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
const insertOrder = async (
  idUser,
  cart,
  total,
  shippingInfo,
  status,
  paymentInt = null
) => {
  const insertOrder = await pool.query(
    "INSERT INTO orders (id_user,products,total,shipping_info,status,payment_int) VALUES ($1,$2,$3,$4,$5,$6)",
    [
      idUser,
      JSON.stringify(cart),
      total,
      JSON.stringify(shippingInfo),
      status,
      paymentInt,
    ]
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
const editOrderStatus = async (status, paymentInt) => {
  if (status === "Completed") {
    const { rows } = await pool.query(
      "SELECT * FROM ORDERS WHERE payment_int=$1",
      [paymentInt]
    );
    const products = rows[0].products;
    const userId = rows[0].id_user;
    for (const product of products) {
      if (product.category === "subscription") {
        manageSubscription(userId, product.details);
      }
    }
  }
  await pool.query("UPDATE ORDERS SET status=$1 WHERE payment_int=$2", [
    status,
    paymentInt,
  ]);
};
const checkStripePayments = async () => {
  try {
    const paymentIntents = await stripe.paymentIntents.list();
    const intents = paymentIntents.data;
    const orders = await getOrders();
    let canceledOrders = [];
    let completedOrders = [];
    for (const paymentIntent of intents) {
      const canceledOrder = orders.find(
        (order) =>
          order.status === "Processing" &&
          order.payment_int === paymentIntent.id &&
          paymentIntent.status === "canceled"
      ); // find cancelled intents in orders

      const completedOrder = orders.find(
        (order) =>
          order.status === "Processing" &&
          order.payment_int === paymentIntent.id &&
          paymentIntent.status === "succeeded"
      );

      if (canceledOrder) {
        canceledOrders = [...canceledOrders, canceledOrder];
      }
      if (completedOrder) {
        completedOrders = [...completedOrders, completedOrder];
      }
    }
    for (const canceledOrder of canceledOrders) {
      await editOrderStatus("Canceled", canceledOrder.payment_int);
    }
    for (const completedOrder of completedOrders) {
      await editOrderStatus("Completed", completedOrder.payment_int);
      const products = completedOrder.products;
      const userId = completedOrder.id_user;
      for (const product of products) {
        if (product.category === "subscription") {
          manageSubscription(userId, product.details);
        }
      }
    }
    console.log("Check stripe intents finished");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkOrder,
  sendOrder,
  getOrderByUserId,
  getOrders,
  editOrderStatus,
  checkStripePayments,
};
