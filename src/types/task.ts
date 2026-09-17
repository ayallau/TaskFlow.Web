export type Task = {
  id: number;
  title: string;
  status: "open" | "done";
  priority: string;
  assignee: string;
};
