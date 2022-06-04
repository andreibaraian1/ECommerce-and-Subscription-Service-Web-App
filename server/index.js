const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { checkStripePayments } = require("./services/order.services");
dotenv.config();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

let minutes = 30;
let interval = minutes * 60 * 1000;
setInterval(() => {
  console.log("Started stripe payment checks");
  checkStripePayments()
}, interval);

const usersRouter = require("./routes/users.routes");
const productsRouter = require("./routes/products.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
const stripeRouter = require("./routes/stripe.routes");

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/", stripeRouter);

app.listen(3001, () => {
  console.log("Server started");
});
