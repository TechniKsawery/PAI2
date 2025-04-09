import dotenv from "dotenv";

// wczytuje .env do aplikacji
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? 3000,
  DATABASE: {
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    URI: process.env.DB_URI ?? '',
  },
};
