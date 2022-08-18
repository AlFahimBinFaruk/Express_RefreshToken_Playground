const jwt = require("jsonwebtoken");
// genarate access token
// expires in 20 sec
const genarateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "20s",
  });
};

module.exports = genarateAccessToken;
