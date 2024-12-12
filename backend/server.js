import express from "express";
import { connectDB } from "./config/db.js";
import Task from "./models/task.js";

const app = express();

app.use(express.json()); // allow us to accept JSON data in the req.body

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Task.find({});
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    console.log("Error in fetching todos:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/api/todos", async (req, res) => {
  console.log(req);
  const task = req.body; // user will send this data
  console.log(task);
  if (!task.title) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a title" });
  }
  if (!task.description) {
    task.description = "No description provided";
  }
  if (!task.image) {
    task.image = "https://images.unsplash.com/photo-1641154706848-fe27fd366032";
  }
  const newTask = new Task(task);

  try {
    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ success: false, message: `Server Error` });
    process.exit(1); // 1 = failure, 0 = success
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`id: ${id}`);

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (err) {
    console.log("Error in deleting todos:", err.message);
    res.status(404).json({ success: false, message: "Todo not found" });
  }
});

app.listen(8020, () => {
  connectDB();
  console.log("Server started at http://localhost:8020");
});
