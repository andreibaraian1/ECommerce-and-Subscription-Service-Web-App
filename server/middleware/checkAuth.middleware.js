const jwt = require("jsonwebtoken");
module.exports = function authorization(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).send({ error: "Not logged in" });
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = data.id;
    req.username = data.username;
    req.role = data.role;
    next();
  } catch {
    return res.status(400).send({ error: "Authentification failed" });
  }
};
