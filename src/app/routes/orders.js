const express = require('express')

const auth = require('../middlewares/auth')

const router = express.Router()

const orderController = require('../controllers/OrderController')

/**
 * @swagger
 *
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       productId:
 *         type: string
 *         required: true
 *         default: ""
 *       quantity:
 *         type: number
 *         required: true
 *         default: 1
 */

/**
 * @swagger
 *
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Use to get all orders
 *     responses:
 *       200:
 *         description: Success to get orders
 *         content:
 *           'application/json': {}
 *
 */
router.get('/', orderController.index)

/**
 * @swagger
 *
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a order
 *     security:
 *       - Token: []
 *     description: Use to create an order
 *     requestBody:
 *       content:
 *         application/json:
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Order"
 *     responses:
 *       200:
 *         description: Success to create a new order
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 */
router.post('/', auth, orderController.create)

/**
 * @swagger
 *
 * /orders/{orderId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get a specific order
 *     description: Use to get an order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of order that you want to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success to get an order
 *         content:
 *           'application/json': {}
 *
 */
router.get('/:orderId', orderController.show)

/**
 * @swagger
 *
 * /orders/{orderId}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete a order
 *     description: Use to delete a order
 *     security:
 *       - Token: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of order that needs to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess to delete an order
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 */
router.delete('/:orderId', auth, orderController.destroy)

module.exports = router
