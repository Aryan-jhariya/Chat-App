import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set in environment');
    }

    await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
