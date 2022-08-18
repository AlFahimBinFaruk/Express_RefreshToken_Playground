const router = require("express").Router();

// middlewares
const validateRefreshToken = require("../middlewares/validateRefreshToken");

// controllers
const {
  loginUser,
  registerUser,
  manageRefreshToken,
} = require("../controllers/user");

// login user
router.post("/login", loginUser);

// register user
router.post("/register", registerUser);

// get new access token
router.post("/manage-refresh-token", validateRefreshToken, manageRefreshToken);

module.exports = router;
