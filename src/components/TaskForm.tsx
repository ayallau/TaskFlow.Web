import { useState } from "react";
import type {
  TaskFormValues,
  TaskFormErrors,
  TaskFormTouched,
} from "../types/taskFormValues";
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

const initialTouched: TaskFormTouched = {
  title: false,
  description: false,
  priority: false,
  assignee: false,
};

//==================== Validation ====================//

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

//==================== Task Form ====================//

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormValues>(initialValues);
  const [touched, setTouched] = useState<TaskFormTouched>(initialTouched);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const currentErrors = validateTaskForm(form);
  const showTitleError =
    (touched.title || submitAttempted) && Boolean(currentErrors.title);
  const showAssigneeError =
    (touched.assignee || submitAttempted) && Boolean(currentErrors.assignee);
  const showDescriptionError =
    (touched.description || submitAttempted) &&
    Boolean(currentErrors.description);
  const showPriorityError =
    (touched.priority || submitAttempted) && Boolean(currentErrors.priority);

  //==================== Handlers ====================//

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    const validationErrors = validateTaskForm(form);
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

  function handleBlur(field: keyof TaskFormTouched) {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }

  //======================= Render ====================//

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          type="text"
          id="task-title"
          value={form.title}
          onChange={(event) =>
            setForm({ ...form, title: event.currentTarget.value })
          }
          onBlur={() => handleBlur("title")}
          aria-invalid={showTitleError}
          aria-describedby={showTitleError ? "task-title-error" : undefined}
        />
        {showTitleError && (
          <p id="task-title-error" role="alert">
            {currentErrors.title}
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
          aria-invalid={showDescriptionError}
          aria-describedby={
            showDescriptionError ? "task-description-error" : undefined
          }
        />
        {showDescriptionError && (
          <p id="task-description-error" role="alert">
            {currentErrors.description}
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
          aria-invalid={showAssigneeError}
          aria-describedby={
            showAssigneeError ? "task-assignee-error" : undefined
          }
        />
        {showAssigneeError && (
          <p id="task-assignee-error" role="alert">
            {currentErrors.assignee}
          </p>
        )}
      </div>

      <button type="submit">Create Task</button>

      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </form>
  );
}
