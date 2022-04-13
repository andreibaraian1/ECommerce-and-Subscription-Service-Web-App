const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT;
const orderServices = require("../services/order.services");
const fulfillOrder = (status, session) => {
  orderServices.editOrderStatus(status, session.payment_intent);
};
const webhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  const session = event.data.object;
  switch (event.type) {
    case "checkout.session.completed":
      fulfillOrder("Completed", session);
      break;
    case "checkout.sesion.expired":
      fulfillOrder("Canceled", session);
    default:
      console.log(event.type, "event not tracked");
  }

  res.status(200);
};

module.exports = {
  webhook,

};
