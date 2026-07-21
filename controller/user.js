const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUserId } = require("../sevice/auth");
const URL = require("../models/url");

async function handleUserSignup(req, res) {
  const { name, email, password, role } = req.body;
  const profileImage = req.file ? req.file.filename : "";

  await User.create({
    name,
    email,
    password,
    role: role || "NORMAL",
    profileImage,
  });

  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid credentials",
    });
  }

  const token = setUserId(user);
  res.cookie("token", token);
  return res.redirect("/");

  return res.json({ token }); 
}

module.exports = { handleUserSignup, handleUserLogin };
