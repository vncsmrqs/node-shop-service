const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

module.exports.only = (object, fields) => {
    if (!object instanceof Object) {
        return new Error('First parameter must be an Object')
    }

    if (!fields instanceof Array) {
        return new Error('Second parameter must be an Array')
    }


    let subset = {}

    for (const [ key, value ] of Object.entries(object)) {
        if (fields.includes(key)) {
            subset[key] = value
        }
    }

    return subset
}

module.exports.deleteFile = async (storage, filePath) => {
    if (storage === 's3') {
        const s3 = new aws.S3()

        return new Promise((resolve, reject) => {
            s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: path
            }, (error, data) => {
                if (error) {
                    return reject(error)
                }

                resolve(data)
            })
        })
    }

    return promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', 'storage', 'uploads', filePath)
    )
}
