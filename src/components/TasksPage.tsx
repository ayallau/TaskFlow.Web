import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { Section } from "./shared/Section";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskSearch } from "./TaskSearch";
import { getTasks } from "../services/tasksService";

type LoadStatus = "idle" | "loading" | "success" | "error";

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const openTasksCount = tasks.filter((task) => task.status === "open").length;

  const [searchTerm, setSearchTerm] = useState(() => {
    return sessionStorage.getItem("taskflow.searchTerm") ?? "";
  });

  const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      setLoadStatus("loading");
      setLoadError(null);

      try {
        const data = await getTasks(controller.signal);

        if (controller.signal.aborted) return;

        setTasks(data);
        setLoadStatus("success");
      } catch (error) {
        if (controller.signal.aborted) return;

        setLoadError(
          error instanceof Error ? error.message : "Failed to load tasks",
        );
        setLoadStatus("error");
      }
    }

    void loadTasks();

    return () => controller.abort();
  }, [refreshKey]);

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
      <Section title="Add Task">
        <TaskForm onAddTask={handleAddTask} />
      </Section>

      <Section title="Search Task">
        <TaskSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </Section>

      <Section title={`Task List (${openTasksCount})`}>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={loadStatus === "loading"}
        >
          Refresh Tasks
        </button>

        {loadStatus === "loading" && <p role="status">Loading tasks...</p>}

        {loadStatus === "error" && (
          <p role="alert">Failed to load tasks: {loadError}</p>
        )}

        {loadStatus === "success" && tasks.length === 0 && (
          <p>No tasks available.</p>
        )}

        {loadStatus === "success" && tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            searchTerm={searchTerm}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </Section>
    </Section>
  );
}
