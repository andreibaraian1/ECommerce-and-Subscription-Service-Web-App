const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const usersRouter = require("./routes/users.routes");
const productsRouter = require("./routes/products.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(3001, () => {
  console.log("Server started");
});
