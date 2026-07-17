const express = require("express");
const URL = require("../models/url");
const { restriction } = require("../middleware/auth");

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/admin/urls", restriction(["ADMIN"]), async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/", restriction(["NORMAL", "ADMIN"]), async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    id: null,
    urls: [],
  });
});

module.exports = router;
