import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
