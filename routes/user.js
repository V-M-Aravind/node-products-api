const express = require("express");
const fs = require("fs");
const rootDir = require("../utilities/getRootDir");
const path = require("path");
const productController = require("../controller/productController");
const userController = require("../controller/userController");

const router = express.Router();
router.get("/", userController.getHomePage);

const PRODUCTS_NOT_FOUND = {
  message: "No Products Found",
  status: "NO_PRODUCTS_FOUND",
};

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

module.exports = router;
