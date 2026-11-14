import type { Task } from "../../types/task";
import { Card } from "../shared/Card";
import { Link } from "react-router";
import { routePaths } from "../../routes/routePaths";

type TaskCardProps = Task & {
  onDelete: (taskId: number) => void;
  onToggleStatus: (taskId: number) => void;
};

export function TaskCard({
  id,
  title,
  status,
  priority,
  assignee,
  onDelete,
  onToggleStatus,
}: TaskCardProps) {
  return (
    <Card>
      <h3>{title}</h3>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>

      {assignee && <p>Assignee: {assignee}</p>}

      <Link to={`${routePaths.tasks}/${id}`}>View Details</Link>

      <button type="button" onClick={() => onToggleStatus(id)}>
        Toggle status
      </button>

      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </Card>
  );
}
