require("dotenv").config();
const jwt = require("jsonwebtoken");
// const secret = "short@1234";

function setUserId(user) {
  //   if (!token) return null;
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_KEY,
  );
}

function getUser(token) {
  if (!token) return null;

  return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
  setUserId,
  getUser,
};
