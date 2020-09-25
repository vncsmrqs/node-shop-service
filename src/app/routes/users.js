const express = require('express')

const upload = require('../middlewares/upload')
const userController = require('../controllers/UserController')

const router = express.Router()

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *         default: ""
 *       password:
 *         type: string
 *         required: true
 *         default: ""
 */

/**
 * @swagger
 *
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Use to get all users
 *     responses:
 *       200:
 *         description: Success to get users
 *         content:
 *           'application/json': {}
 *
 */
router.get('/', userController.index)

/**
 * @swagger
 *
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a user
 *     description: Use to create a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/User"
 *     responses:
 *       201:
 *         description: Success to create a user
 *         content:
 *           'application/json': {}
 *       409:
 *         description: Email already exists in database
 *         content:
 *           'application/json': {}
 */
router.post('/signup', userController.register)

/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Get a token
 *     description: Use to login in the api
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: Success to login
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Auth failed
 *         content:
 *           'application/json': {}
 */
router.post('/login', userController.login)

module.exports = router
