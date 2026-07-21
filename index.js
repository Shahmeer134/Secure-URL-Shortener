require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const PORT = 8001;
const app = express();
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");

// Routes
const urlRoute = require("./routes/url");
const connectDB = require("./connection");
const URL = require("./models/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
// const {restrictToLoggedInUser, checkAuth} = require("./middleware/auth"); ==> User for Old Cookies Middleware
const { checkForAuthentication, restriction } = require("./middleware/auth");

// View (Ejs)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const uploadDir = path.resolve("./uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(uploadDir));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

connectDB();

// app.use("/url", restrictToLoggedInUser, urlRoute); ==> User for Old Cookies Middleware
app.use("/url", restriction(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute)
// app.use("/", checkAuth, staticRoute); ==> User for Old Cookies Middleware
// app.use("/login", staticRoute)

app.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});
