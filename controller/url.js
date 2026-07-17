const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleShortUrl(req, res) {
  
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ err: "URL required" });
  }

  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  const allUrls = await URL.find({
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortId, urls: [] });
  // return res.redirect("/");
}

async function handleGetShortUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true },
  );
  res.redirect(entry.redirectUrl);
}

async function handleVisitShortUrl(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

   if (!result) {
    return res.status(404).json({
      message: "URL not found",
    });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleShortUrl, handleGetShortUrl, handleVisitShortUrl };
