const express = require("express");
const { handleShortUrl, handleGetShortUrl, handleVisitShortUrl } = require("../controller/url");
// const { model } = require("mongoose");
const { restriction } = require("../middleware/auth");
const URL = require("../models/url");


const router = express.Router();

router.post("/", handleShortUrl)
router.get("/:shortId", handleGetShortUrl)
router.get("/analytics/:shortId", handleVisitShortUrl)

router.get("/", restriction(["NORMAL" || "ADMIN"]), async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

module.exports = router;