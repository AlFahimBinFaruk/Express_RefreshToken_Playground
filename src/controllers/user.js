const User = require("../models/user");
const bcrypt = require("bcrypt");
const genarateAccessToken = require("../utils/genarateAccessToken");
const genarateRefreshToken = require("../utils/genarateRefreshToken");
// register user
const registerUser = async (req, res) => {
  let { username, email, password } = req.body;

  //see if user has provided all info
  if (!username || !email || !password) {
    res.status(400).json({msg:"Please provide all info"})
  }

  //see if user alrady exits
  const userExits = await User.findOne({ where: { email } });
  if (userExits) {
    res.status(400).json({msg:"User already exits"})
  }

  //everything is ok then proceed
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  //if user is created successfully
  if (user) {
    res.status(201).json({
      userId: user.userId,
      username: user.username,
      email: user.email,
      accessToken: genarateAccessToken(user.userId),
      refreshToken: genarateRefreshToken(user.userId),
    });
  } else {
    res.status(400).json({msg:"Invalid Creds"})
  }
};

// login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //if the user exits
  const user = await User.findOne({ where: { email } });

  //then if the password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      userId: user.userId,
      username: user.username,
      email: user.email,
      accessToken: genarateAccessToken(user.userId),
      refreshToken: genarateRefreshToken(user.userId),
    });
  } else {
    res.status(400).json({msg:"Invalid Creds"})
  }
};

// manage refresh token => genarate new access token from refresh token and send it
const manageRefreshToken = async (req, res) => {
  try {
    const userId = req.userId;
    res.status(200).json({
      accessToken: genarateAccessToken(userId),
      refreshToken: genarateRefreshToken(userId),
    });
  } catch (error) {
    res.status(400).json({ msg: error.message })
  
  }
};

module.exports = {
  loginUser,
  registerUser,
  manageRefreshToken,
};
