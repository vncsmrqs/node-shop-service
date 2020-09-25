const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    let token = req.header('Authorization') || ''

    token = token.replace('Bearer ', '')

    try {
        req.userData = jwt.verify(token, process.env.JWT_KEY)

        next()
    } catch (e) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}

module.exports = auth;
