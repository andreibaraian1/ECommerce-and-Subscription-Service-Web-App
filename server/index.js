const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const generateAccessToken = require("./generateAccessToken");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
dotenv.config();
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    //const password = req.body.password;
    const email = req.body.email;
    pool.query(
      "INSERT INTO users (username,password,email) VALUES ($1,$2,$3)",
      [username, password, email],
      (err, result) => {
        if (err) {
          const { constraint } = err;
          if (constraint == "users_username_key")
            res
              .status(409)
              .send("Username already exists. Please choose another one");
          if (constraint == "users_email_key")
            res
              .status(409)
              .send("Account already exists for this email address");
        } else {
          res.status(201).send("Registration succesful");
        }
      }
    );
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
});
app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    pool.query(
      "SELECT * FROM USERS WHERE username=$1",
      [username],
      (err, result) => {
        if (err) {
          res.status(400);
        } else {
          const { rowCount } = result;

          if (rowCount === 0) res.status(200).send("Username does not exist");
          else {
            const user = result.rows[0];
            bcrypt.compare(password, user.password, function (error, result) {
              if (error) {
                res.status(500).send("Unexpected error");
              }
              if (result) {
                console.log("login sucessful");
                const token = generateAccessToken(user);
                //res.cookie("token", token, { maxage: 86400, httpOnly: true });
                res.status(200).send({ auth: true, token: token });
              } else {
                console.log("Passwords do not match");
              }
            });
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
});
app.post("/me", (req, res) => {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authentificate token" });
      res.status(200).send(decoded);
    });
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
});
app.listen(3001, () => {
  console.log("Server started");
});
