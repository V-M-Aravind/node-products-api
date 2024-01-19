const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const userController = require("../controller/userController");

router.get("/add-product", userController.getAddProductPage);

router
  .route("/products")
  .post(productController.addProduct)
  .put(productController.updateProduct);
//add product update view also, where you can recieve the existing prd details and then submit o put req after editing
router.route("/products/:id").delete(productController.deleteProduct);

module.exports = router;
