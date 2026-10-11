import { useState } from "react";
import type { TaskFormValues } from "../types/taskFormValues";
import type { Task } from "../types/task";

type TaskFormProps = {
  onAddTask: (newTask: Task) => void;
};

const initialValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "medium",
  assignee: "",
};

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormValues>(initialValues);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTask: Task = {
      id: Date.now(),
      status: "open",
      ...form,
    };

    onAddTask(newTask);
    setForm(initialValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          type="text"
          id="task-title"
          required
          value={form.title}
          onChange={(event) =>
            setForm({ ...form, title: event.currentTarget.value })
          }
        />
      </div>

      <div>
        <label htmlFor="task-description">Description</label>
        <input
          type="text"
          id="task-description"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.currentTarget.value })
          }
        />
      </div>

      <div>
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={form.priority}
          onChange={(event) =>
            setForm({
              ...form,
              priority: event.currentTarget.value as TaskFormValues["priority"],
            })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="task-assignee">Assignee</label>
        <input
          type="text"
          id="task-assignee"
          value={form.assignee}
          onChange={(event) =>
            setForm({ ...form, assignee: event.currentTarget.value })
          }
        />
      </div>

      <button type="submit">Create Task</button>

      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </form>
  );
}
