import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todosRoutes from "./routes/todos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8020;

app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/todos", todosRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
