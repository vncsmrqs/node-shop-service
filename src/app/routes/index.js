const express = require('express')
const router = express.Router()

const productsRoutes = require('./products')
const ordersRoutes = require('./orders')
const usersRoutes = require('./users')

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     Token:
 *       type: http
 *       scheme: bearer
 */

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'up' })
})

router.use('/products', productsRoutes)
router.use('/orders', ordersRoutes)
router.use('/users', usersRoutes)

module.exports = router
