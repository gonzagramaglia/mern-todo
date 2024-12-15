import { create } from "zustand";

export const useTaskTodos = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  createTask: async (newTask) => {
    if (!newTask.title) {
      return { success: false, message: "Please add a title" };
    }

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const data = await res.json();
      set((state) => ({ tasks: [...state.tasks, data.data] }));
      return { success: true, message: "Task created" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
  fetchTasks: async () => {
    try {
      const res = await fetch("/api/todos");
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await res.json();
      set({ tasks: data.data });
      return { success: true, message: "Tasks fetched" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
  deleteTask: async (tid) => {
    try {
      const res = await fetch(`/api/todos/${tid}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
      const data = await res.json();

      //update the UI immediately, without needing a refresh
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== tid),
      }));
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
  updateTask: async (tid, updatedTask) => {
    try {
      const res = await fetch(`/api/todos/${tid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      const data = await res.json();

      //update the UI immediately, without needing a refresh
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === tid ? data.data : task)),
      }));
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
}));
