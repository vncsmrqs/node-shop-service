const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { only } = require('../helpers')

const index = async (req, res) => {
    try {
        const users = await User.find().select('email')

        const response = {
            count: users.length,
            users
        }

        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            messsge: 'Something went wrong!',
            error
        })
    }
}

const register = async (req, res) => {
    let { email, password } = req.body

    try {
        const emailExist = await User.findOne({
            email
        }).catch(e => { throw e })

        if (emailExist) {
            return res.status(409).json({
                message: 'E-mail already registered'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            email,
            password: hashedPassword
        })

        const createdUser = await user.save()
            .catch(error => { throw error })

        return res.status(201).json({
            message: 'User created',
            createdUser: only(createdUser._doc, ['email', '_id'])
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
            .select('email password')
            .catch(e => { throw e})

        if (!user) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)
            .catch(e => { throw e})

        if(!validPassword) {
            return res.status(401).json({
                message: "Auth failed",
            })
        }

        const payload = {
            userId: user._id,
            email,
            authenticated_at: Date.now()
        }

        const token = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '1h'
        })

        return res.status(200).json({
            message: "Auth successful",
            token,
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
    register,
    login,
}
