import type { Task } from "../types/task";
import type { TaskDto } from "../types/taskDto";

export function mapTaskDtoToTask(dto: TaskDto): Task {
  return {
    id: dto.id,
    title: dto.title,
    status: dto.completed ? "done" : "open",
    priority: dto.priority.toLowerCase() as Task["priority"],
    assignee: dto.assigned_to,
    ...(dto.description !== undefined && {
      description: dto.description,
    }),
  };
}
