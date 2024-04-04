import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/database.js";
import cookieParser from "cookie-parser";
import peopleRoutes from "./routes/peopleRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Instead of bodyParser.urlencoded
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
app.use("/auth", userRoutes);
app.use("/people", peopleRoutes);

const PORT = process.env.PORT || 3300;

const server = app.listen(PORT, () => {
  console.log(`Server now up and running on port ${PORT}`);
});

export default server;
