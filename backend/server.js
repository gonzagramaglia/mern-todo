import express from "express";
import { connectDB } from "./config/db.js";
import todosRoutes from "./routes/todos.js";

const app = express();

app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/todos", todosRoutes);

app.listen(8020, () => {
  connectDB();
  console.log("Server started at http://localhost:8020");
});
