const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
 function generateAccessToken(user) {
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
module.exports = generateAccessToken;
