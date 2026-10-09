import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  searchTerm: string;
  onDelete: (taskId: number) => void;
  onToggleStatus: (taskId: number) => void;
};

export function TaskList({
  tasks,
  searchTerm,
  onDelete,
  onToggleStatus,
}: TaskListProps) {
  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
