const jwt = require("jsonwebtoken");

// see if the user has send the data needed to authorize him
const validateRefreshToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify
      const docoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      //get user creds from the token
      req.userId = docoded.id;

      next();
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }
  //if token is not provided..
  if (!token) {
    res.status(401).json({ msg: "Not Authorized and no Token Given." });
  }
};

module.exports = validateRefreshToken;
