import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import bodyParser from "body-parser";
import { logMiddleware } from "./logger/middlewares/logMiddleware";
import { todosController } from "./todo/controllers/todos.controller";
import { productsController } from "./product/controllers/products.controller";
import { ENV } from "./config/env";
import { connectDB } from "./config/database";

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(logMiddleware);

app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.send("Hello World!");
});

app.use("/todos", todosController);
app.use("/products", productsController);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port: ${ENV.PORT}`);
});
