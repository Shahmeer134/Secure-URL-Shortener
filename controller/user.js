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

  // const sessionId = uuidv4(); --> Use for stateFull Authentication
  // setUserId(sessionId, user); --> Use for stateFull Authentication
  // res.cookie("uid", sessionId); --> Use for stateFull Authentication

  const token = setUserId(user);
  res.cookie("token", token);
  return res.redirect("/");
  // res.cookie("uid", token); --> for Cookies
  // return res.redirect("/"); --> for Cookies

  return res.json({ token }); // --> For <bearer>
}

module.exports = { handleUserSignup, handleUserLogin };
