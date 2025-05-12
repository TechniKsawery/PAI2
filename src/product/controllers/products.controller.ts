import express from "express";
import { StatusCodes } from "http-status-codes";
import { object, string, number, ValidationError } from "yup";
import { CreateProductDTO } from "../dto/create-product.dto";
import { plainToInstance } from "class-transformer";
import { validationMiddleware } from "../../common/middlewares/validation.middleware";
import { ProductService } from "../services/product.service";

export const productsController = express.Router();

productsController.get("/", async (request, response) => {
	try {
		const products = await ProductService.getAllProducts();
		response.status(StatusCodes.OK).send(products);
	} catch (e) {
		response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
	}
});

productsController.get("/:id", async (request, response) => {
	try {
		const product = await ProductService.getProductById(request.params.id);

		if (!product) {
			response.status(StatusCodes.NOT_FOUND).send();
			return;
		}

		response.send({ data: product });
	} catch (e) {
		response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
	}
});

productsController.post(
	"/",
	validationMiddleware(CreateProductDTO),
	async (request, response, next) => {
		try {
			const productDto = plainToInstance(CreateProductDTO, request.body);
			const savedProduct = await ProductService.createProduct(productDto);

			response.send({
				data: savedProduct,
			});
		} catch (e) {
			response.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
		}
	},
);
