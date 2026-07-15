const express = require("express");
const { handleShortUrl, handleGetShortUrl, handleVisitShortUrl } = require("../controller/url");
const { model } = require("mongoose");

const router = express.Router();

router.post("/", handleShortUrl)
router.get("/:shortId", handleGetShortUrl)
router.get("/analytics/:shortId", handleVisitShortUrl)
module.exports = router;