import type { Task } from "../types/task";
import type { TaskDto } from "../types/taskDto";
import { mapTaskDtoToTask } from "../mappers/taskMapper";
import { apiGet } from "./apiClient";

export async function getTasks(signal?: AbortSignal): Promise<Task[]> {
  const dtos = await apiGet<TaskDto[]>("/tasks.json", signal);

  return dtos.map(mapTaskDtoToTask);
}
