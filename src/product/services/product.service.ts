import type { CreateProductDTO } from "../dto/create-product.dto";
import { ProductModel } from "../models/product.model";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductService {
	static async getAllProducts() {
		const products = await ProductModel.find();
		return products;
	}

	static async getProductById(id: string) {
		const product = await ProductModel.findById(id);

		if (!product) {
			throw new Error("Product not found");
		}
		return product;
	}

	static async createProduct(dto: CreateProductDTO) {
		const product = new ProductModel(dto);
		const savedProduct = await product.save();
		return savedProduct;
	}
}
