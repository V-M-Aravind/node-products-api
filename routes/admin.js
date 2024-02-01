const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const adminController = require("../controller/adminController");

router.get("/add-product", adminController.getAddProductPage);
router.get("/update-product", adminController.getUpdateInitialProductPage);
router.get("/update-product/:id", adminController.getUpdateFinalProductPage);

router
  .route("/products")
  .post(productController.addProduct)
  .put(productController.updateProduct);

router.route("/products/:id").delete(productController.deleteProduct);

module.exports = router;
