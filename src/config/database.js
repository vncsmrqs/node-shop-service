module.exports = {
    username: process.env.MONGO_USERNAME || 'root',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'default_db',
    password: process.env.MONGO_PASSWORD || 'root',
}