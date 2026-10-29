export type TaskDto = {
  id: number;
  title: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  assigned_to: string;
  description?: string;
};
