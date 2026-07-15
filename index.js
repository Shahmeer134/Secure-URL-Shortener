require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const PORT = 8001;
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");


// Routes
const urlRoute = require("./routes/url");
const connectDB = require("./connection");
const URL = require("./models/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const {restrictToLoggedInUser, checkAuth} = require("./middleware/auth");
// View (Ejs)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


connectDB();

app.use("/url", restrictToLoggedInUser, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute)
// app.use("/login", staticRoute)

app.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});
