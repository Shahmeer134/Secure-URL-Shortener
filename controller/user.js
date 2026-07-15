const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUserId } = require("../sevice/auth");
const URL = require("../models/url");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid credentials",
    });
  }
  const sessionId = uuidv4();
  setUserId(sessionId, user);
  res.cookie("uid", sessionId);

  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
