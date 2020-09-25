const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const crypto = require('crypto')
const aws = require('aws-sdk')

const storage = process.env.STORAGE_TYPE || 'local'

const bucket = process.env.AWS_S3_BUCKET || 'default'
const destination = path.resolve(__dirname, '..', 'storage', 'uploads');

const makeFilename = (req, file, callback) => {
    crypto.randomBytes(16, (error, hash) => {
        if (error) {
            return callback(error)
        }

        const arrayName = file.originalname.split('.')

        const extension = arrayName[arrayName.length - 1]

        const filename = `${hash.toString('hex')}.${extension}`

        if (storage !== 's3') {
            file.key = filename
        }

        callback(null, filename)
    })
}

const storages = {
    local: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, destination)
        },
        filename: makeFilename
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: makeFilename
    })
}

module.exports = {
    destination,
    storage: storages[storage],
}
