const Order = require('../models/Order')
const Product = require('../models/Product')

const { only } = require('../helpers')

const index = async (req, res) => {
    try {
        const orders = await Order.find()
            .select('quantity product')
            .populate('product', 'name')
            .catch(e => { throw e })

        const response = {
            count: orders.length,
            orders
        }

        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const create = async (req, res) => {
    const { productId, quantity } = req.body

    try {
        const product = await Product.findById(productId)
            .catch(e => { throw e })

        if (!product) {
            return res.status(404).json({
                message: 'Product not found!'
            })
        }

        const order = new Order({
            product: productId,
            quantity
        })

        try {
            const createdOrder = await order.save()
                .catch(e => { throw e })

            return res.status(200).json({
                message: 'Order created successfully',
                createdOrder: only(createdOrder._doc, ['product', 'quantity', '_id'])
            })
        }
        catch(error) {
            return res.status(500).json({
                message: 'Something went wrong!',
                error
            })
        }
    }
    catch(error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const show = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const order = await Order.findById(orderId)
            .select('product quantity')
            .populate('product')
            .catch(e => { throw e })

        if (order) {
            return res.status(200).json({
                message: 'Order found',
                order
            })
        }

        return res.status(404).json({
            message: 'Product not found'
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const destroy = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const orderDeleted = await Order.findByIdAndRemove(orderId)
            .catch(e => { throw e })

        if (orderDeleted) {
            return res.status(200).json({
                message: 'Order deleted',
                orderDeleted
            })
        }

        return res.status(404).json({
            message: 'Order not found'
        })
    }
    catch(error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

module.exports = {
    index,
    create,
    show,
    destroy
}
