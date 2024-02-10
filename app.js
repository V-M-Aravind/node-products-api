const express = require("express");
const mongoDBConnect = require("./utilities/database");
const path = require("path");
const dotenv = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const helmet = require("helmet");
const isAuthenticated = require("./middlewares/isAuthenticated");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const pageNotFoundRoutes = require("./routes/pageNotFound");
const corsMiddleware = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorhandler");

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
        url:
          process.env.NODE_ENV === "production"
            ? "https://node-products-api-vma.onrender.com/"
            : "http://localhost:3000",
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

//setting cors headers
app.use(corsMiddleware);

//setting http response headers using helmet
app.use(helmet());

//routes
app.use(userRoutes);
app.use("/admin", authRoutes);
app.use("/admin", isAuthenticated, adminRoutes);
app.use(pageNotFoundRoutes);

/** custom error handling function route*/
app.use(errorHandler);

mongoDBConnect()
  .then((client) => {
    app.listen(PORT, () => {
      console.log("Listening to port: ", PORT);
    });
  })
  .catch((e) => console.error("Server error :", e));
