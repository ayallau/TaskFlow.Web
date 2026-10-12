import type { Task } from "./task";

export type TaskFormValues = Pick<Task, "title" | "priority" | "assignee"> & {
  description: string;
};

export type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;
