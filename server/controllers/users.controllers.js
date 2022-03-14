const pool = require("../db");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../generateAccessToken");
const login = async (req, res) => {
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
                res.cookie("token", token, { maxage: 86400, httpOnly: true });
                res.status(200).json({ message: "Succesfully logged in !" });
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
};
const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, saltRounds);
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
};
const logout = (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out !" });
};
const getUser = (req, res) => {
  try {
    return res.json({
      user: {
        id: req.userId,
        username: req.username,
        role: req.role,
      },
    });
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
module.exports = {
  login,
  register,
  logout,
  getUser,
};
