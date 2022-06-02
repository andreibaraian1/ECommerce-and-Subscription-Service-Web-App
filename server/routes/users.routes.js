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
router.get("/getUsers", checkAuth, userController.getUsers);
router.post(
  "/updateSubscription",
  checkAuth,
  userController.updateSubscription
);
router.post("/updateRole", checkAuth, userController.updateRole);
router.get("/getQRToken", checkAuth, userController.generateQrCode);
router.post("/checkQRToken", checkAuth, userController.checkQrCode);
router.get("/getClosingTime", userController.getClosingTime);
router.get("/getTime", userController.getTime);
router.post("/setTime", checkAuth, userController.setTime);

module.exports = router;
