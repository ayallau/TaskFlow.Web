import { useState } from "react";
import type { TaskFormValues, TaskFormErrors } from "../types/taskFormValues";
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

function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (values.description.length > 500) {
    errors.description = "Description must not exceed 500 characters";
  }

  if (!values.assignee.trim()) {
    errors.assignee = "Assignee is required";
  }

  return errors;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateTaskForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      status: "open",
      ...form,
      title: form.title.trim(),
      assignee: form.assignee.trim(),
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
          value={form.title}
          onChange={(event) =>
            setForm({ ...form, title: event.currentTarget.value })
          }
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "task-title-error" : undefined}
        />
        {errors.title && (
          <p id="task-title-error" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.currentTarget.value })
          }
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "task-description-error" : undefined
          }
        />
        {errors.description && (
          <p id="task-description-error" role="alert">
            {errors.description}
          </p>
        )}
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
          aria-invalid={Boolean(errors.assignee)}
          aria-describedby={errors.assignee ? "task-assignee-error" : undefined}
        />
        {errors.assignee && (
          <p id="task-assignee-error" role="alert">
            {errors.assignee}
          </p>
        )}
      </div>

      <button type="submit">Create Task</button>

      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </form>
  );
}
