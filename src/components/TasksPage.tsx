import { useState } from "react";
import type { Task } from "../types/task";
import { Section } from "./shared/Section";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskSearch } from "./TaskSearch";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Learn Props",
    status: "open",
    priority: "high",
    assignee: "Ayal",
  },
  {
    id: 2,
    title: "Build UserCard",
    status: "done",
    priority: "medium",
    assignee: "Dana",
  },
];

export function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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

      <TaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        searchTerm={searchTerm}
        onDelete={handleDeleteTask}
        onToggleStatus={handleToggleStatus}
      />
    </Section>
  );
}
