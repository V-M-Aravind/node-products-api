const express = require("express");
const productController = require("../controller/productController");
const homePageController = require("../controller/homePageController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - qty
 *         - imgUrl
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
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
 *         _id: d5fE_asz
 *         title: Laptop
 *         price: 89.40
 *         qty: 20
 *         imgUrl: https://media.croma.com/image/tjq.png?tr=w-1000
 *         description: A good laptop for personal use
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Products managing API
 */

router.get("/", homePageController.getHomePage);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: All products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *
 * /products/{productId}:
 *   get:
 *     summary: get a product by productId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         required: true
 *         description: String ID of the product to get.
 *     responses:
 *       200:
 *         description: The requested product.
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
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *
 */
router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

module.exports = router;
