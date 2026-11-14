import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { Section } from "./shared/Section";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskSearch } from "./TaskSearch";
import { getTasks } from "../services/tasksService";
import { useSearchParams } from "react-router";

type LoadStatus = "idle" | "loading" | "success" | "error";

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";

  const statusParam = searchParams.get("status");
  const priorityParam = searchParams.get("priority");

  const status =
    statusParam === "open" || statusParam === "done" ? statusParam : "all";

  const priority =
    priorityParam === "low" ||
    priorityParam === "medium" ||
    priorityParam === "high"
      ? priorityParam
      : "all";

  const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  function handleSearchChange(value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value.trim()) {
          next.set("search", value);
        } else {
          next.delete("search");
        }

        return next;
      },
      { replace: true },
    );
  }

  function handleStatusChange(value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value === "all") {
          next.delete("status");
        } else {
          next.set("status", value);
        }

        return next;
      },
      { replace: true },
    );
  }

  function handlePriorityChange(value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value === "all") {
          next.delete("priority");
        } else {
          next.set("priority", value);
        }

        return next;
      },
      { replace: true },
    );
  }

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = status === "all" || task.status === status;

    const matchesPriority = priority === "all" || task.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const visibleTasksCount = visibleTasks.length;

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
    const label = visibleTasksCount === 1 ? "task" : "tasks";
    document.title = `TaskFlow (${visibleTasksCount} ${label})`;
  }, [visibleTasksCount]);

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
        <TaskSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Section>

      <Section title="Filter Tasks">
        <label htmlFor="task-status-filter">Status:</label>
        <select
          id="task-status-filter"
          value={status}
          onChange={(event) => handleStatusChange(event.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="done">Done</option>
        </select>

        <label htmlFor="task-priority-filter">Priority:</label>
        <select
          id="task-priority-filter"
          value={priority}
          onChange={(event) => handlePriorityChange(event.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </Section>

      <Section title={`Task List (${visibleTasksCount})`}>
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

        {loadStatus === "success" &&
          tasks.length > 0 &&
          visibleTasksCount === 0 && <p>No tasks match the current filters.</p>}

        {loadStatus === "success" && tasks.length > 0 && (
          <TaskList
            tasks={visibleTasks}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </Section>
    </Section>
  );
}
