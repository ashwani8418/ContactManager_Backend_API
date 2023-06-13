const express = require("express");
const { registerUser, userLogin, currentUserInfo } = require("../controllers/userController");
const validateToken = require("../middleWare/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", userLogin);

router.get("/current", validateToken, currentUserInfo);

module.exports = router;