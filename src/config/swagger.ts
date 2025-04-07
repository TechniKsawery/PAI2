import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PAI2 API',
      version: '1.0.0',
      description: 'API do zarządzania przedmiotami i produktami'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5001}`,
        description: 'Serwer deweloperski'
      }
    ]
  },
  apis: ['./src/routes/*.ts', '../my-api-gr-1/src/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec; 