
const jwt = require("jsonwebtoken");
const secret = "short@1234";

function setUserId(user) {
  //   if (!token) return null;
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
  );
}

function getUser(token) {
  if (!token) return null;

  return jwt.verify(token, secret);
}

module.exports = {
  setUserId,
  getUser,
};
