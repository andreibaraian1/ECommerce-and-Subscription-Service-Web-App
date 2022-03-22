const pool = require("../db.config");
const generateAccessToken = require("../middleware/generateAccessToken.middleware");
const bcrypt = require("bcrypt");
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
      error: "Username does not exist",
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
      error: "Passwords do not match",
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

module.exports = {
  login,
  register,
};
