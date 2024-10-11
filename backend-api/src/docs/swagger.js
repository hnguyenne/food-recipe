const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Food Recipe App API',
            version: '1.0.0',
            description: 'Food Recipe API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./backend-api/src/routes/*.js', './backend-api/src/docs/components.yaml'],
    
};

const specs = swaggerJsdoc(options);


module.exports = {
    specs,
    swaggerUi,
}