import mongoose from "mongoose";

// Funkcja do połączenia z bazą danych
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/pai2");
    console.log(`MongoDB połączone: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Błąd: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
