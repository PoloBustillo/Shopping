import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { processToken, admin } from "./middleware/authMiddleware.js";
dotenv.config();
connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.method, req.originalUrl);
  next();
}

app.use("/api/orders", logOriginalUrl, orderRoutes);
app.use("/api/products", logOriginalUrl, productRoutes);
app.use("/api/upload", logOriginalUrl, uploadRoutes);
app.use("/api/users", logOriginalUrl, userRoutes);
app.get("/api/config/paypal", logOriginalUrl, processToken, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || "9000";

app.listen(
  PORT,
  console.log(
    `Server up in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline.bold
  )
);
