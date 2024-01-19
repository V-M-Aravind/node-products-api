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
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use(pageNotFoundRoutes);

app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
