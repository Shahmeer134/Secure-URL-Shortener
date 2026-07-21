const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { handleUserSignup, handleUserLogin } = require("../controller/user");
const router = express.Router();

const uploadDir = path.resolve("./uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("profileImage"), handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
