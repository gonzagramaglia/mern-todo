import express from "express";
import { connectDB } from "./config/db.js";
import Task from "./models/task.js";

const app = express();

app.use(express.json()); // allow us to accept JSON data in the req.body

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

app.listen(8020, () => {
  connectDB();
  console.log("Server started at http://localhost:8020");
});
