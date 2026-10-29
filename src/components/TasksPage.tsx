import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { Section } from "./shared/Section";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskSearch } from "./TaskSearch";

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const openTasksCount = tasks.filter((task) => task.status === "open").length;

  const [searchTerm, setSearchTerm] = useState(() => {
    return sessionStorage.getItem("taskflow.searchTerm") ?? "";
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: Task[] = await response.json();

        if (!controller.signal.aborted) {
          setTasks(data);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Failed to load tasks:", error);
      }
    }

    void loadTasks();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("taskflow.searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const label = openTasksCount === 1 ? "open task" : "open tasks";
    document.title = `TaskFlow (${openTasksCount} ${label})`;
  }, [openTasksCount]);

  function handleAddTask(task: Task) {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function handleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function handleToggleStatus(taskId: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "open" ? "done" : "open",
            }
          : task,
      ),
    );
  }

  return (
    <Section title="Tasks">
      <TaskSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Section title="Add Task">
        <TaskForm onAddTask={handleAddTask} />
      </Section>

      <Section title="Current Tasks">
        <TaskList
          tasks={tasks}
          searchTerm={searchTerm}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
        />
      </Section>
    </Section>
  );
}
