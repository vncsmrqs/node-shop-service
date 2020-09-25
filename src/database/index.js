const mongoose = require('mongoose')

const { host, database, port } = require('../config/database')

mongoose.Promise = global.Promise

const url = `mongodb://${host}:${port}/${database}`

const init = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('\nMongoose! Connection established.')
        
        const connection = mongoose.connection
        
        connection.on('connected', () => {
            console.log('\nMongoose! Connected to mongo.')
        })

        connection.on('disconnected', () => {
            console.log('\nMongoose! Disconnected from mongo.')
        })

        process.on('SIGINT', () => conn.close(() => {
            console.log('\nMongoose! Disconnected by application termination')
            process.exit(0)
        }))
    }
    catch(error) {
        console.error(`Mongoose! Failed to connect to ${url}. Error: ${error.message}\n`, {error})
    }
}

init()