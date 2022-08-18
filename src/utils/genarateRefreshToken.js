const jwt = require("jsonwebtoken");
// genarate refresh token
// refresh token expires in 1 year
const genarateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1y",
  });
};


module.exports=genarateRefreshToken