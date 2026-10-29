import { useEffect, useState } from "react";
import type { Task } from "../../types/task";

export function TaskApiExample() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: Task[] = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }

    void loadTasks(); // execute the async function, the void means we don't use the return value. The return value of the async function loadTasks() is a Promise<void>
  }, []); // empty array means run only once on mount

  return <p>Number of tasks: {tasks.length}</p>;
}
