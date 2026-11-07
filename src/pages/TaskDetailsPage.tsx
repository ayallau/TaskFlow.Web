import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Task } from "../types/task";
import { getTasks } from "../services/tasksService";
import { routePaths } from "../routes/routePaths";

export function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isValidId = !!id && Number.isSafeInteger(taskId) && taskId > 0;

  useEffect(() => {
    if (!isValidId) return;

    const controller = new AbortController();

    async function loadTask() {
      setIsLoading(true);
      setError(null);
      setTask(null);

      try {
        const tasks = await getTasks(controller.signal);

        if (controller.signal.aborted) return;

        const foundTask = tasks.find((item) => item.id === taskId) ?? null;

        setTask(foundTask);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Failed to load task");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTask();

    return () => controller.abort();
  }, [taskId, isValidId]);

  if (!isValidId) {
    return <p>Invalid task ID.</p>;
  }

  if (isLoading) {
    return <p role="status">Loading task...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <article>
      <h1>{task.title}</h1>
      <p>ID: {task.id}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Assignee: {task.assignee}</p>
      {task.description && <p>{task.description}</p>}

      <Link to={routePaths.tasks}>Back to Tasks</Link>
    </article>
  );
}
