import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import itemRoutes from './routes/itemRoutes';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';

// Importy z projektu kolegi
import { productsController } from '../my-api-gr-1/src/product/controllers/products.controller';
import { todosController } from '../my-api-gr-1/src/todo/controllers/todos.controller';
import { logMiddleware } from '../my-api-gr-1/src/logger/middlewares/logMiddleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logMiddleware); 


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


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/items', itemRoutes);


app.use('/api/products', productsController);
app.use('/api/todos', todosController);


app.use(errorHandler);


const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
  });
});
