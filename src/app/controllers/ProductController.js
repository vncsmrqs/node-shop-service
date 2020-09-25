const Product = require('../models/Product')

const { only, deleteFile } = require('../helpers')


const index = async (req, res) => {
    try {
        const products = await Product.find()
            .select('name price photo')
            .catch(e => { throw e })

        const response = {
            count: products.length,
            products
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
    let data = only(req.body, ['name', 'price'])

    const product = new Product(data)

    try {
        const createdProduct = await product.save()
            .catch(e => { throw e })

        return res.status(201).json({
            messsge: 'Product created',
            createdProduct: only(createdProduct._doc, ['name', '_id', 'price', 'photo'])
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const show = async (req, res) => {
    const productId = req.params.productId

    try {
        const product = await Product.findById(productId).select('name price photo')
            .catch(e => { throw e })

        if (product) {
            return res.status(200).json({
                message: 'Product found',
                product
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

const update = async (req, res) => {
    const productId = req.params.productId

    let data = only(req.body, ['name', 'price'])

    try {
        const productUpdated = await Product.findByIdAndUpdate(productId, {
            $set: data
        }).catch(e => { throw e })

        if (productUpdated) {
            return res.status(201).json({
                message: 'Product updated',
                productUpdated
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
    const productId = req.params.productId

    try {
        const productRemoved = await Product.findByIdAndRemove(productId)
            .catch(e => { throw e })

        if (productRemoved) {
            return res.status(200).json({
                message: 'Product deleted',
                productRemoved
            })
        }

        return res.status(404).json({
            message: 'Product not found'
        })
    }
    catch(error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const updatePhoto = async (req, res) => {
    const productId = req.params.productId

    console.log(req.file)

    const { originalname: name, size, key, location: url = '' } = req.file

    try {
        const product = await Product.findById(productId)
            .catch(e => { throw e })

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const oldPhoto = product.photo

        product.photo = {
            name,
            size,
            key,
            url
        }

        const productUpdated = await product.save()
            .catch(e => { throw e })

        if (oldPhoto && oldPhoto.hasOwnProperty('key')) {
            await deleteFile(process.env.STORAGE_TYPE, oldPhoto.key)
        }

        if (productUpdated) {
            return res.status(201).json({
                message: "Product's photo updated",
                productUpdated
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const deletePhoto = async (req, res) => {
    const productId = req.params.productId

    try {
        const product = await Product.findById(productId)

        if (product) {

            console.log({product})

            if (product.photo) {
                await deleteFile(process.env.STORAGE_TYPE, product.photo.key)
            }

            product.photo = undefined

            const productUpdated = await product.save()
                .catch(e => { throw e })

            return res.status(200).json({
                message: 'Photo deleted successfuly',
                productUpdated
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

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    updatePhoto,
    deletePhoto,
}
