import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  searchTerm: string;
  status: string;
  priority: string;
  onDelete: (taskId: number) => void;
  onToggleStatus: (taskId: number) => void;
};

export function TaskList({
  tasks,
  searchTerm,
  status,
  priority,
  onDelete,
  onToggleStatus,
}: TaskListProps) {
  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = status === "all" || task.status === status;

    const matchesPriority = priority === "all" || task.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      {visibleTasks.map((task) => (
        <TaskCard
          key={task.id}
          {...task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </>
  );
}
