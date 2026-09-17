export type TaskStatus = "open" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
};
