const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthError:
 *       type: object
 *       required:
 *         - message
 *         - statusText
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         statusText:
 *           type: string
 *           description: Error status
 *       example:
 *         message: Not Authenticated
 *         statusText: NOT_AUTHENTICATED
 */

/**
 * @swagger
 * /admin/signIn:
 *   post:
 *     summary: Admin Sign In
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *             - username
 *             - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *       description: Sign in credentials
 *     responses:
 *       200:
 *         description: The product added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 statusText:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Authentication Failure
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthError'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *
 */

router.post("/signIn", authController.postSignIn);

module.exports = router;
