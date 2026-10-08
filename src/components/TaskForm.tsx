import { useState } from "react";
import type { Task } from "../types/task";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
};

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      status: "open",
      priority: "medium",
      assignee: "Ayal",
    };

    onAddTask(newTask);
    setTitle("");
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Task title"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}
