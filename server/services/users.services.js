const pool = require("../db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const login = async (username, password) => {
  const result = await pool.query("SELECT * FROM USERS WHERE username=$1", [
    username,
  ]);
  if (result.err) {
    return { status: 500, error: "Query error" };
  }
  const { rowCount } = result;

  if (rowCount === 0) {
    //   res.status(200).send("Username does not exist");
    return {
      status: 200,
      error: "Incorrect username or password",
    };
  } else {
    const user = result.rows[0];
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const token = generateAccessToken(user);
      //   res.cookie("token", token, { maxage: 86400, httpOnly: true });
      //   res.status(200).json({ message: "Succesfully logged in !" });
      return {
        status: 200,
        token,
        message: "Succesfully logged in !",
      };
    }
    return {
      status: 200,
      error: "Incorrect username or password",
    };
  }
};
const register = async (username, password, email) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    await pool.query(
      "INSERT INTO users (username,password,email) VALUES ($1,$2,$3)",
      [username, encryptedPassword, email]
    );
    return {
      status: 201,
      message: "Registration succesful",
    };
  } catch (error) {
    const { constraint } = error;
    if (constraint == "users_username_key") {
      return {
        status: 200,
        error: "Username already exists. Please choose another one",
      };
    }
    //   res
    //     .status(409)
    //     .send("Username already exists. Please choose another one");
    if (constraint == "users_email_key") {
      return {
        status: 200,
        error: "Email already exists.",
      };
    }
  }
};
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      id: user.id,
      role: user.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "24h" }
  );
};
const manageSubscription = async (userId, time) => {
  const userQuery = await pool.query("SELECT * FROM USERS WHERE id=$1", [
    userId,
  ]);
  let newDate;
  const user = userQuery.rows[0];
  if (user?.subscription) {
    date = new Date(user.subscription);

    newDate = new Date(date.getTime() + time * 24 * 60 * 60 * 1000);
  } else {
    newDate = new Date(new Date().getTime() + time * 24 * 60 * 60 * 1000);
  }
  await pool.query("UPDATE USERS SET subscription=$1 WHERE id=$2", [
    JSON.stringify(newDate),
    userId,
  ]);
};
module.exports = {
  login,
  register,
  generateAccessToken,
  manageSubscription,
};
