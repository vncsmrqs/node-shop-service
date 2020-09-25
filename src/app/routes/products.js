const express = require('express')


const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const productController = require('../controllers/ProductController')

const router = express.Router()

/**
 * @swagger
 *
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       price:
 *         type: number
 */

/**
 * @swagger
 *
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all Products
 *     description: Use to get all products
 *     responses:
 *       200:
 *         description: Sucess to get products
 *         content:
 *           'application/json': {}
 *
 */
router.get('/', productController.index)

/**
 * @swagger
 *
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product
 *     description: Use to create a product
 *     security:
 *       - Token: []
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Product object that needs to be added to the database"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Product"
 *     responses:
 *       200:
 *         description: Sucess to create a new product
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 */
router.post('/', auth, productController.create)

/**
 * @swagger
 *
 * /products/{productId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product
 *     description: Use to get a specific product
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of product that needs to be getted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess to get the product
 *         content:
 *           'application/json': {}
 *       400:
 *         description: Undocumented error
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Product not found
 *         content:
 *           'application/json': {}
 *
 */
router.get('/:productId', productController.show)

/**
 * @swagger
 *
 * /products/{productId}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     description: Use to update an existent product
 *     security:
 *       - Token: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of product that needs to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           description: "Product object that needs to be updated"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Product"
 *     responses:
 *       200:
 *         description: Sucess to update a product
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Product not found
 *         content:
 *           'application/json': {}
 */
router.patch('/:productId', auth, productController.update)

/**
 * @swagger
 *
 * /products/{productId}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     security:
 *       - Token: []
 *     description: Use to delete a product
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of product that needs to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess to delete a product
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Product not found
 *         content:
 *           'application/json': {}
 */
router.delete('/:productId', auth, productController.destroy)

/**
 * @swagger
 *
 * /products/{productId}/photo:
 *   post:
 *     tags:
 *       - Products
 *     summary: Update a product photo
 *     description: Use to update a product photo
 *     security:
 *       - Token: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         required: true
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 required: true
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Success to update a new product photo
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Product not found
 *         content:
 *           'application/json': {}
 */
router.post('/:productId/photo', auth, upload({
    dest: 'test',
    destination: 'test'
}).single('photo'), productController.updatePhoto)

/**
 * @swagger
 *
 * /products/{productId}/photo:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product photo
 *     description: Use to delete a product photo
 *     security:
 *       - Token: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success to delete a new product photo
 *         content:
 *           'application/json': {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           'application/json': {}
 *       404:
 *         description: Product not found
 *         content:
 *           'application/json': {}
 */
router.delete('/:productId/photo', auth, productController.deletePhoto)

module.exports = router
