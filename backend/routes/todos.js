import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", getTodos);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
