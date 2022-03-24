const userServices = require("../services/users.services");
const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userServices.login(username, password);
    if (result?.error) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.cookie("token", result.token, { maxage: 86400, httpOnly: true });
      res.status(result.status).json({ message: result.message });
    }
  } catch (err) {
    res.status(500).send("Unexpected error");
  }
};
const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const result = await userServices.register(username, password, email);
    if (result?.error) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.status(result.status).json({ message: result.message });
    }
  } catch (err) {
    console.log(err);
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
