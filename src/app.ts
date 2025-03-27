import express from "express";
import { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import itemRoutes from "./routes/itemsRoutes";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
connectDB();

const app: Express = express();

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Przedmiotów',
      version: '1.0.0',
      description: 'API do zarządzania przedmiotami',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5001}`,
        description: 'Serwer deweloperski',
      },
    ],
  },
  apis: [path.resolve(__dirname, './routes/*.ts')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));
app.use("/api/items", itemRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
