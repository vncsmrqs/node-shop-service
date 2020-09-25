const mongoose = require('mongoose')

const { deleteFile } = require('../helpers')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: Object
    }
})

productSchema.pre('save', function () {
    if (this.photo.hasOwnProperty('url') && !this.photo.url) {
        this.photo.url = `${process.env.APP_URL}/public/${this.photo.key}`
    }
})

productSchema.pre('remove', function () {
    if (this.photo) {
        return deleteFile(process.env.STORAGE_TYPE, this.photo.key)
    }
})

module.exports = mongoose.model('Product', productSchema)
