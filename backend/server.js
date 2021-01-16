import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { processToken } from "./middleware/authMiddleware.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.method, req.originalUrl);
  next();
}

app.get("/", (req, res) => {
  res.send("Runnning...");
});
app.use("/api/orders", logOriginalUrl, orderRoutes);
app.use("/api/products", logOriginalUrl, productRoutes);
app.use("/api/users", logOriginalUrl, userRoutes);
app.get("/api/config/paypal", logOriginalUrl, processToken, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || "9000";

app.listen(
  PORT,
  console.log(
    `Server up in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline.bold
  )
);
