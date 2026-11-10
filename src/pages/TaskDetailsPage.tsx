import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Task } from "../types/task";
import { getTasks } from "../services/tasksService";
import { routePaths } from "../routes/routePaths";

export function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isValidId = !!id && Number.isSafeInteger(taskId) && taskId > 0;

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        const data = await getTasks(controller.signal);

        if (controller.signal.aborted) return;

        setTasks(data);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err instanceof Error ? err.message : "Failed to load tasks");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => controller.abort();
  }, []);

  if (!isValidId) {
    return <p>Invalid task ID.</p>;
  }

  if (isLoading) {
    return <p role="status">Loading task...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const currentIndex = tasks.findIndex((item) => item.id === taskId);

  if (currentIndex === -1) {
    return <p>Task not found.</p>;
  }

  const task = tasks[currentIndex];

  const previousTask = tasks[currentIndex - 1];
  const nextTask = tasks[currentIndex + 1];

  return (
    <article>
      <h1>{task.title}</h1>
      <p>ID: {task.id}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Assignee: {task.assignee}</p>
      {task.description && <p>{task.description}</p>}

      <Link to={routePaths.tasks}>Back to Tasks</Link>

      <nav aria-label="Task navigation">
        {previousTask ? (
          <Link to={`${routePaths.tasks}/${previousTask.id}`}>
            Previous Task |
          </Link>
        ) : (
          <span>Previous Task |</span>
        )}

        <span>
          ({currentIndex + 1} / {tasks.length})
        </span>

        {nextTask ? (
          <Link to={`${routePaths.tasks}/${nextTask.id}`}>| Next Task</Link>
        ) : (
          <span>| Next Task</span>
        )}
      </nav>
    </article>
  );
}
