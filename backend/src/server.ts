import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import recipeRouter from "./routes/recipeRoutes";
import userRouter from "./routes/userRoutes";
import cors from "cors";

dotenv.config({ path: "././config.env" });

const app = express();
const PORT = process.env.PORT;

connectDB();

// MIDDLEWARES
//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// json body parser
app.use(express.json());

// ROUTE
app.get("/", (req, res) => {
  res.send("Hello World");
});

// MOUNTING ROUTERS
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
