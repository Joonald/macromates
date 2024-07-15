import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./././config.env" });

const DB = process.env.DATABASE?.replace(
  "<password>",
  process.env.DATABASE_PASSWORD!
);

mongoose.set({
  strictQuery: true,
});

const connectDB = async () => {
  try {
    await mongoose.connect(DB!);
    console.log("Connection to database successful!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
