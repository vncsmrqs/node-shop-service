const path = require('path')

module.exports = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Shop Service',
      description: 'Simple API for Shop Services by Vinicius Marques',
      contact: {
        name: "Vinicius Marques"
      },
      servers: [
        "http://localhost:3000"
      ]
    }
  },
  apis: [
    "./app/routes/*.js",
  ]
}
