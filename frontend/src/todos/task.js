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
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  fetchTasks: async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    set({ tasks: data.data });
  },
}));
