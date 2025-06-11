import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRoute from "../backend/routes/userRoute.js";
import messageRoute from "../backend/routes/messageRoute.js"

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen on port ${PORT}`)
})