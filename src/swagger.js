const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'YouTube Subscribers API',
            version: '1.0.0',
            description: 'A simple API to manage YouTube channel subscribers',
            contact: {
                name: 'API Support',
                url: 'https://subscriber-backend.onrender.com'
            },
        },
        servers: [
            {
                url: 'https://subscriber-backend.onrender.com',
                description: 'Production server',
            },
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/app.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
module.exports = specs; 