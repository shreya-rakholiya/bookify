const { findUser } = require("../services/register.service");
const jwt = require("jsonwebtoken")

require("dotenv").config();

const validateAuthIdToken = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    res.status(403).json({ message: "Unauthorized request." });
    return;
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  let userId = decode.id;

  if (!userId) {
    res.status(403).json({ message: "Unauthorized request." });
    return;
  }

  const userData = await findUser({ _id: userId });

  // console.log(userData, "userData");
  const { password, ...otherData } = userData;
  // console.log(password,"pwd");
  // console.log(otherData,"otherr");
  
  

  req.authUser = otherData;
  // console.log(req.authUser,"other data");
  
  req.isAdmin = otherData.role === "admin";
  // console.log(req.isAdmin,"isadmin");
  
  next();
};

module.exports={
  validateAuthIdToken
}
