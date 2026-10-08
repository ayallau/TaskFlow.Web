import { useState } from "react";
import type { Task } from "../types/task";
import { Card } from "./shared/Card";
import { Section } from "./shared/Section";
import { TaskCard } from "./TaskCard";

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
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");

  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleAddTask() {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      status: "open",
      priority: "medium",
      assignee: "Ayal",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value);
  }

  return (
    <Section title="Tasks">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tasks"
      />

      <button type="button" onClick={handleAddTask}>
        Add Task
      </button>

      {visibleTasks.map((task) => (
        <Card key={task.id}>
          <TaskCard {...task} />

          <button type="button" onClick={() => handleDeleteTask(task.id)}>
            Delete
          </button>
        </Card>
      ))}
    </Section>
  );
}
