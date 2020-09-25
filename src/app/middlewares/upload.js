const upload = require('multer')

const config = require('../../config/multer')

module.exports = (options = {}) => {
    return upload({
        dest: config.destination,
        storage: config.storage,
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        fileFilter: (req, file, callback) => {
            const allowedMimes = [
                'image/jpeg',
                'image/jpg',
                'image/png'
            ]

            if (allowedMimes.includes(file.mimetype)) {
                return callback(null, true)
            }

            callback(new Error('Invalid file type.'))
        },
        ...options
    })
}
