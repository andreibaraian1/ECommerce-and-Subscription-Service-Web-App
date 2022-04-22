const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const checkAuth = require("../middleware/checkAuth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", checkAuth, userController.logout);
router.get("/getUser", checkAuth, userController.getUser);
router.get("/getUserInfo", checkAuth, userController.getUserInfo);
router.post("/updateUserInfo", checkAuth, userController.updateUserInfo);

module.exports = router;
