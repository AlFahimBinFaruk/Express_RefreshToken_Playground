const jwt = require("jsonwebtoken");

//user model
const User = require("../models/user");

// see if the user has send the data needed to authorize him
const validateUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      //get user creds from the token
      req.user = await User.findOne({ where: { userId:decoded.id } });

      next();
    } catch (error) {
      res.status(401).json({msg:error.message})
    }
  }
  //if token is not provided..
  if (!token) {
    res.status(401).json({msg:"Not Authorized and no Token Given."})
  }
};

module.exports = validateUser;
