const express = require("express");
const productController = require("../controller/productController");
const userController = require("../controller/userController");

const router = express.Router();
router.get("/", userController.getHomePage);

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

module.exports = router;
