import type { Task } from "./task";

export type TaskFormValues = Pick<
  Task,
  "title" | "priority" | "description" | "assignee"
>;
