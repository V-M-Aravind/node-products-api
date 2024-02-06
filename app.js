const express = require("express");
const mongoDBConnect = require("./utilities/database");
const path = require("path");
const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const pageNotFoundRoutes = require("./routes/pageNotFound");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//setting swagger
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Node Product API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD Product API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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

mongoDBConnect()
  .then((client) => {
    app.listen(PORT, () => {
      console.log("Listening to port: ", PORT);
    });
  })
  .catch((e) => console.error("Server error :", e));
