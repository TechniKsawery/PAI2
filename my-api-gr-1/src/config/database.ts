import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
	try {
		await mongoose.connect(ENV.DATABASE.URI);
		console.log("serwer połączony");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Błąd połączenia ", error.message);
		}
		process.exit(1);
	}
};
