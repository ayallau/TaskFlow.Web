import type { Task } from "../../types/task";
import { TaskCard } from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onToggleStatus: (taskId: number) => void;
};

export function TaskList({ tasks, onDelete, onToggleStatus }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
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
