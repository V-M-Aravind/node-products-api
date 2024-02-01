const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const pageNotFoundRoutes = require("./routes/pageNotFound");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
//setting view with EJS template
app.set("view engine", "ejs");

//setting public directory for assets
app.use(express.static(path.join(__dirname, "public")));

//setting body parser for parsing incoming json body from requests
app.use(bodyParser.json());

//routes
app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use(pageNotFoundRoutes);

app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
