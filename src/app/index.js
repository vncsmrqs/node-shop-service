const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const morgan = require('morgan')

const database = require('../database')
const cors = require('./middlewares/cors')
const routes = require('./routes')
const swaggerOptions = require('../config/swagger')

const app = express()

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors)

const swaggerDocument = swaggerJsDoc(swaggerOptions)
app.use('/public', express.static('storage/uploads'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(routes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports= app
