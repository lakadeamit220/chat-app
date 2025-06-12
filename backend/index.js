import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoute from "../backend/routes/userRoute.js";
import messageRoute from "../backend/routes/messageRoute.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen on port ${PORT}`);
});