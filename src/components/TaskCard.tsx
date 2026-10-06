// TaskCard responsibility:
// This component is responsible for displaying a single task's relevant information, such as title, status, priority, and assignee.

import { useState } from "react";
import type { Task } from "../types/task";

export function TaskCard({ title, status, priority, assignee }: Task) {
  const [currentStatus, setCurrentStatus] = useState(status);

  function handleToggleStatus() {
    setCurrentStatus((previousStatus) =>
      previousStatus === "open" ? "done" : "open",
    );
  }

  return (
    <article>
      <h3>{title}</h3>
      <p>Status: {currentStatus}</p>
      <p>Priority: {priority}</p>
      <p>Assignee: {assignee}</p>
      <button type="button" onClick={handleToggleStatus}>
        Mark as {currentStatus === "open" ? "done" : "open"}
      </button>
    </article>
  );
}
