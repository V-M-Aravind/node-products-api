const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const adminController = require("../controller/adminController");

router.get("/add-product", adminController.getAddProductPage);
router.get("/update-product", adminController.getUpdateInitialProductPage);
router.get("/update-product/:id", adminController.getUpdateFinalProductPage);

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductBody:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - qty
 *         - imgUrl
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The title of your product
 *         price:
 *           type: number
 *           description: The price of product
 *         qty:
 *           type: number
 *           description: inventory stock
 *         imgUrl:
 *           type: string
 *           description: The image url for the product
 *         description:
 *           type: string
 *           description: The description of the product
 *       example:
 *         title: Laptop
 *         price: 89.40
 *         qty: 20
 *         imgUrl: https://media.croma.com/image/tjq.png?tr=w-1000
 *         description: A good laptop for personal use
 *
 *     ServerError:
 *       type: object
 *       required:
 *         - message
 *         - status
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         status:
 *           type: string
 *           description: Error status
 *       example:
 *           message: Something went wrong
 *           status: SERVER_ERROR
 *     ProductDeleted:
 *       type: object
 *       required:
 *         - message
 *         - status
 *       properties:
 *         message:
 *           type: string
 *           description: Product deleted message
 *         status:
 *           type: string
 *           description: success status for deletion
 *       example:
 *           message: Product Successfully Deleted
 *           status: PRODUCT_DELETED
 *     ProductNotFound:
 *       type: object
 *       required:
 *         - message
 *         - status
 *       properties:
 *         message:
 *           type: string
 *           description: Product not found error
 *         status:
 *           type: string
 *           description: Product not found error status
 *       example:
 *           message: Product not found
 *           status: PRODUCT_NOT_FOUND
 *
 *
 */

/**
 * @swagger
 * /admin/products:
 *   post:
 *     summary: Add a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBody'
 *       description: Product to add
 *     responses:
 *       201:
 *         description: The product added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *
 * /admin/products/{productId}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         required: true
 *         description: String ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductBody'
 *       description: Product to update
 *     responses:
 *       200:
 *         description: The product updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductNotFound'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         required: true
 *         description: String ID of the product to update.
 *     responses:
 *       200:
 *         description: The product deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDeleted'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductNotFound'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */

router.route("/products").post(productController.addProduct);
router
  .route("/products/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
