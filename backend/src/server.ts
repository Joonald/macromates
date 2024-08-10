import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import recipeRouter from "./routes/recipeRoutes";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

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
    credentials: true,
  })
);

// json body parser
app.use(express.json());
app.use(cookieParser());

// ROUTE
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use((req, res, next) => {
  // req.requestTime = new Date().toISOString();
  console.log(req.cookies, " + request cookies");
  console.log(req.headers, " + request headers");

  next();
});
// MOUNTING ROUTERS
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
